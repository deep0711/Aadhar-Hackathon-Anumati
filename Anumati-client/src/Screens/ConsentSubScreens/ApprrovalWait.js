import React from 'react';
import { View } from 'react-native';
import { Box, Heading, useTheme, Center, Button } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ApprovalWait({ setCurrent }) {
    const { colors } = useTheme();
    return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Card>
            <Box m="10">
                <Center mb="5">
                    <FontAwesome5 
                    name="umbrella-beach" 
                    size={30} 
                    color={colors["secondary"]["500"] } />
                </Center>
                <Center>
                    <Heading size="md">
                        Waiting for approval
                    </Heading>
                    <Heading size="md">
                        Sit back and relax
                    </Heading>
                </Center>
            </Box>
        </Card>
        </View>);
}