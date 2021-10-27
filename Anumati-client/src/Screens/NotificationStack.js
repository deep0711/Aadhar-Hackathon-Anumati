import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from './Notifications';
import ApproveRequest from './Main/ApproveRequest';
import { useTheme } from 'native-base';

export default function NavigationStack() {
    const {colors} = useTheme();
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { 
                backgroundColor: colors["primary"]["500"],
            },
            headerTintColor: "white"
        }}>
            <Stack.Screen name="NotificationHome" component={Notifications} options={{ title: "Notifications" }} />
            <Stack.Screen name="Request" component={ApproveRequest} />
        </Stack.Navigator>
    )
}