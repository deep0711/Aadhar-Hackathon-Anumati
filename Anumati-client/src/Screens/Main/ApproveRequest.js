import React from 'react';
import { Box, Heading, useTheme, Button } from 'native-base';

export default function ApproveRequest() {
    const { colors } = useTheme();

    return (<Box flex={1} alignItems="center" justifyContent="center">
        <Box
        minWidth="3/5"
        borderRadius="md" 
        p="5" 
        shadow={1} 
        bgColor="white">
            <Heading color="muted.600">
                Consent Request 
            </Heading>
            <Heading mt="3" color="muted.500" size="md">
                From:
            </Heading>
            <Heading color="muted.500" size="md">
                Roshan Rai
            </Heading>
            <Heading mt="3" color="muted.500" size="md">
                Phone No:
            </Heading>
            <Heading color="muted.500" size="md">
                9988776655
            </Heading>
            <Heading mt="3" color="muted.500" size="md">
                Date: 
            </Heading>
            <Heading color="muted.500" size="md">
                dd/mm/yyyy
            </Heading>

            <Box flexDirection="row" mt="5" >
                <Button size="lg" flex="1" mr="1" colorScheme="error">
                    Reject
                </Button>
                <Button size="lg" flex="1" colorScheme="success">
                    Approve
                </Button>
            </Box>
        </Box>
    </Box>)
}