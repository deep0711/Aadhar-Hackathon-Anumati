import React from 'react';
import { Box, Center, Heading, Text, useTheme } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome } from '@expo/vector-icons';

const SuccessLog = ({ colors }) => (
    <Box flex={1} width="full" 
        padding="3">
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box mt="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} />
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Request Sent
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} />
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Consent Request Approved
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>

            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} />
                    <Box mb="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Data Reviewed
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>
        </Box>
);
const FailedLog = ({ colors }) => (
    <Box flex={1} width="full" 
        padding="3">
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box mt="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="check-circle" size={28} color={colors["success"]["500"]} />
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Request Sent
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>
            
            <Box 
            width="full" 
            flex={1}  
            minHeight="32" 
            flexDirection="row"
            >
                <Box 
                flex={1}  
                alignItems="center" 
                justifyContent="center" 
                >
                    <Box maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    <FontAwesome name="times-circle" size={28} color={colors["error"]["500"]} />
                    <Box mb="5" maxWidth="1" flex={1} border={1} borderWidth={2} borderColor="primary.400"  ></Box>
                    
                </Box>
                <Box flex={6} >
                    <Box 
                    shadow="1"
                    backgroundColor="white" 
                    borderRadius="md" 
                    my="3" 
                    p="5"
                    flex="1" >
                        <Heading size="md" color="muted.400">
                            Consent Request Rejected
                        </Heading>
                        <Heading  mt="3"  size="xs" color="muted.400">On: dd/mm/yyyy </Heading>
                    </Box>
                </Box>
            </Box>
        </Box>
)

export default function ConsentLog() {

    const { colors } = useTheme();

    return <Box flex={1} >
        <Center width="full" mt="5">
            <Heading>
                From : Name/Adha_No  
            </Heading>
            <Heading>
                To : Name/Adha_No  
            </Heading>
        </Center>

        <SuccessLog colors={colors} />
        {/* <FailedLog colors={colors} /> */}
        
        <Box 
            mx="5"
            justifyContent="center"
            alignItems="center"
            bgColor="white" 
            my="5"
            borderRadius="md">
                <Heading my="5" color="muted.600">
                    12xfGH456JKD0ZZ
                </Heading>
        </Box>
        
    </Box>
}