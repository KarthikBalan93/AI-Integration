import React, { useState } from 'react';
import {
    Box,
    Button,
    Textarea,
    Heading,
    Image,
    Text
} from '@chakra-ui/react';
import api from '../api'

function ImageGeneration() {

    const [description, setDescription] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [image, setImage] = useState('');
    const [error, setError] = useState('')

    const generateImage = async () => {
        if (!description) {
            return;
        }
        setisLoading(true);
        let response = await api.post('/ai/image/generate', { description });
        if (!response.hasError) {
            setImage(response.imageUrl);
            setisLoading(false)
        } else {
            setError(response.errorMessage);
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }
    return (
        <div>
            <Box
                borderRadius="md"
                border={"1px solid #ccc"}
                minHeight={'100vh'}
                bg={'cornsilk'}
                padding={'10px'}
            >
                <Heading textAlign={'center'}>AI - Integration of Dall-E and Text completion</Heading>
                <Box margin={"auto 20%"} textAlign={'center'} marginTop={50}>
                    <Textarea border={'2px solid #ccc'} placeholder='Enter the description for the image generation...' onChange={(e) => setDescription(e.target.value)} />
                    <Button
                        isLoading={description && isLoading}
                        isDisabled={!description}
                        colorScheme='blue'
                        loadingText='Genarating'
                        marginTop={5}
                        onClick={generateImage}
                    >
                        Generate
                    </Button>
                </Box>
                <Box marginTop={5} display="flex" flexDirection="column" alignItems="center">
                    {
                        image ?
                            <Image
                                src={image}
                                alt="Description of your image"
                                boxSize="400px"
                                objectFit="cover"
                                borderRadius="md"
                            /> :
                            <></>
                    }
                    {
                        error ?
                            <Box
                                p={2}
                                bg={'red.100'}
                                color="white"
                                borderRadius="lg"
                            >
                                <Text>{error}</Text>
                            </Box>
                            : <></>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default ImageGeneration