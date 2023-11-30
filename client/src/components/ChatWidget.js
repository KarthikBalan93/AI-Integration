import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  IconButton,
  useColorModeValue,
  Text,
  HStack,
  Spinner,
  css
} from '@chakra-ui/react';
import { FaRegComments, FaTimes } from 'react-icons/fa';
import api from '../api';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setmessage] = useState('');
  const [userMessage, setUserMessage] = useState('')
  const [messages, setMessages] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [chatId, setchatId] = useState('');
  const chatBoxRef = useRef(null);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      addUserMessage();
    }
  };

  const addUserMessage = () => {
    setisLoading(true)
    setMessages([...messages, { role: 'user', content: message }, { role: 'assistant', isLoading: true }])
    setmessage('')
    setUserMessage(message);
  }

  const sendMessage = async () => {
    let prevMessages = messages;
    let botMessage = await api.post('/ai/chat/message', { message: userMessage, chatId });
    if (!chatId) setchatId(botMessage.chatId);
    if (!botMessage.hasError) {
      prevMessages.push({ role: 'assistant', content: botMessage.message });
    } else {
      prevMessages.push({ role: 'assistant', content: "We are happy to hear you, unfortunately it takes longer than ususal. Please try again", hasError: true });
    }
    setisLoading(false)
    prevMessages = prevMessages.filter(item => !item.isLoading);
    setMessages(prevMessages);
    setUserMessage('')
  }

  useEffect(() => {
    if (userMessage) {
      sendMessage()
    }
  }, [userMessage]);

  useEffect(() => {
    // Scroll to the bottom of the chat box when messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box position="fixed" bottom="2" right="40">
      <IconButton
        icon={<FaRegComments />}
        size="lg"
        onClick={handleToggleChat}
        bg={useColorModeValue('teal.500', 'teal.300')}
        color="white"
        _hover={{ bg: useColorModeValue('teal.600', 'teal.400') }}
        borderRadius="full"
        zIndex="999"
      />

      {isChatOpen && (
        <Box
          position="fixed"
          bottom="80px"
          right="40"
          width="400px"
          minH={'400px'}
          bg={'floralwhite'}
          boxShadow="lg"
          borderRadius="md"
          p={4}
        >
          <HStack>
            <IconButton
              icon={<FaTimes />}
              size="sm"
              onClick={handleToggleChat}
              color="#ccc"
              borderRadius="full"
            />
          </HStack>
          {
            messages.length ?
              <Box 
                overflowY={'auto'}
                maxHeight={'380px'} 
                marginBottom={50} 
                ref={chatBoxRef}
                css={css`
                overflow-y: auto;
                max-height: 380px;
                scrollbar-width: thin;
                scrollbar-color: #319795 white;
                &::-webkit-scrollbar {
                  width: 5px;
                }
    
                &::-webkit-scrollbar-thumb {
                  background-color: #319795;
                }
    
                &::-webkit-scrollbar-track {
                  background-color: white;
                }
              `}>
                {messages.map((message, index) => (
                  <Box
                    key={index}
                    alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                    mb={2}
                    mr={message.role === 'user' ? 1 : 16}
                    ml={message.role === 'user' ? 16 : 0}
                    overflowY="auto"
                  >
                    <Box
                      p={2}
                      bg={message.role === 'user' ? 'blue.500' : message.hasError ? 'red.100' : 'gray.300'}
                      color="white"
                      borderRadius="lg"
                    >
                      {
                        message.isLoading ?
                          <Spinner color='white' /> :
                          <Text>{message.content}</Text>
                      }
                    </Box>
                  </Box>
                ))}
              </Box>
              : <></>
          }
          <HStack position={'fixed'} bottom="100" spacing={8}>
            <Input isDisabled={isLoading} placeholder="Type your message..." minW={250} value={message} onChange={(e) => setmessage(e.target.value)} onKeyDown={handleInputKeyDown} />
            <Button colorScheme="teal" onClick={addUserMessage}>
              Send
            </Button>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default ChatWidget;