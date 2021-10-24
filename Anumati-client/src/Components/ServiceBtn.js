import React from 'react';
import { TouchableOpacity } from 'react-native'; 
import { Box, Center, Heading } from 'native-base';
import Card from './Card';

export default function ServiceBtn({ handlePress, Icon, Label }) {
return (
        <TouchableOpacity 
            onPress={ handlePress }>
            <Box m="2">
            <Card>
                <Box
                width="24" 
                height="24" 
                p="3">
                    <Center flex={1} 
                    flexWrap="wrap"
                    flexDirection="row">
                        {Icon}  
                        <Heading mt="3"
                        textAlign="center"
                        fontSize="xs">
                            {Label}
                        </Heading>
                    </Center>
                </Box>
            </Card>
            </Box>
        </TouchableOpacity>
    );
}
