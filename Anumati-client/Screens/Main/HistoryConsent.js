import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Box, Center, Heading } from 'native-base';
import Card from '../../Components/Card';

export default function HistoryConsent() {
    const history = [];
    console.log(history.length);

    return (
        <Box 
        flex="1" 
        justifyContent="center"
        alignItems="center"
        >
            { history.length==0 ? 
                <Card 
                borderRadius="lg">
                <Heading m="10">
                    No Consent
                </Heading>
                </Card> :
                <Text>
                    Consent is History
                </Text>
            }
        </Box>
    );
}

const styles = StyleSheet.create({

});