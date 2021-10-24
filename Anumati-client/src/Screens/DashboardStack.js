import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'native-base';
import Dashboard from './Main/Dashboard';
import RequestConsent from './Main/RequestConsent';
import HistoryConsent from './Main/HistoryConsent';

export default function DashboardStack() {
    
    const {colors} = useTheme();

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: colors['primary']['500'] ,
            },
            headerTintColor: "white"
        }}>
            <Stack.Screen name="dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Request Consent" component={RequestConsent} />
            <Stack.Screen name="History" component={HistoryConsent} />
        </Stack.Navigator>
    )
}