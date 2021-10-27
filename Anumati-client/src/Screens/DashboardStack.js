import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'native-base';
import Dashboard from './Main/Dashboard';
import RequestConsent from './Main/RequestConsent';
import HistoryConsent from './Main/HistoryConsent';
import ConsentLog from './Main/ConsentLog';

export default function DashboardStack() {
    
    const {colors} = useTheme();

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
        initialRouteName = "Dashboard"
        screenOptions={{
            headerStyle: {
                backgroundColor: colors['primary']['500'] ,
            },
            headerTintColor: "white"
        }}>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Request-Consent" component={RequestConsent} />
            <Stack.Screen name="History" component={HistoryConsent} />
            <Stack.Screen name="Consent Logs" component={ ConsentLog } />
        </Stack.Navigator>
    )
}