import React, { useEffect } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import ChatWidget from './components/ChatWidget';
import ImageGeneration from "./components/ImageGeneration";
import api from './api';
import { getCookie, setCookie } from './helpers/cookieHelper';
import "./App.css";
const App = () => {
  useEffect(() => {
        const componentData = async () => {
          const cookieId = getCookie('ochntc');
          if (!cookieId || cookieId === 'undefined') {
            const { data } = await api.post('/user/anonymous');
            if (!data.hasError) {
              setCookie('ochntc', data.token, process.env.REACT_APP_TOKEN_EXPIRATION);
            }
          }
          console.log(process.env.REACT_APP_API_BASE_URL)
        }
        componentData();
      }, [])
    
  return (
    <div className="App">
      <ChakraProvider>
        <CSSReset />
        <ImageGeneration />
        <ChatWidget />
      </ChakraProvider>
    </div>
  );
};

export default App;
