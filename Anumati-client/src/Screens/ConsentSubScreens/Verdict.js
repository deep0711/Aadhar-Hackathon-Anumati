import React from 'react';
import Card from '../../Components/Card';
import {View} from 'react-native';
import {Box, Button, Center, Heading, useTheme } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const ConsentSuccess = ({ colors, handlePress }) => (
    <Box m="10">
    <Center>
        <Box mb="5">
        <FontAwesome 
        name="check-circle-o" 
        size={28} 
        color={colors["secondary"]["500"]} />
        </Box>
        <Heading size="lg">
            Consent Approved
        </Heading>
        <Heading size="lg">
            Log Generated
        </Heading>
        <Button
        mt="5"
        colorScheme="secondary">
            <Heading 
            onPress={ handlePress }
            color="white"
            size="md">
                Go Home
            </Heading>
        </Button>
    </Center>
    </Box>
);

const ConsentFail = ({ colors, handlePress }) => (
    <Box m="10">
        <Center>
            <Box mb="5">
            <Foundation 
            name="x-circle" 
            size={28} 
            color={colors["error"]["500"]} />
            </Box>
            <Heading size="lg" color={colors["error"]["500"]} >
                Consent Disapproved
            </Heading>
            <Button
            mt="5"
            colorScheme="secondary">
                <Heading 
                onPress={handlePress}
                color="white"
                size="md">
                    Go Home
                </Heading>
            </Button>
        </Center>
    </Box>
);

export default function Verdict({ setCurrent, success=true, navigation }) {
    const { colors } = useTheme();
    const handleHome = () => {
        // reset the consent
        navigation.goBack();
        setCurrent(0);
    };

    return (
        <View 
    style={{ 
        flex: 1,
        alignItems: "center", 
        }}>
            <Box mt="10">
            <Card>
                { success ? <ConsentSuccess 
                handlePress={ handleHome }
                colors={colors} /> : 
                <ConsentFail 
                handlePress={ handleHome }
                colors={colors} /> }
            </Card>
            </Box>
        </View>
    );
}