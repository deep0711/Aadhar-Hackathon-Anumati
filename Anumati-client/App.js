import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/Screens/WelcomeScreen';
import RegistrationScreen from './src/Screens/Registration';
import Tutorial from './src/Screens/Tutorial';
import TabNav from './src/Screens/TabNav';
import CreatePin from './src/Screens/CreatePin';

import Store from './src/Reducers';
import customTheme from './theme.json';
import { NativeBaseProvider, extendTheme } from 'native-base';
import InitialConsent from './src/Screens/InitialConsent';

export default function App(){
    const Stack = createNativeStackNavigator();
    const theme = extendTheme(customTheme);
    return(
        <Provider store={Store}>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Welcome">
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}}/>
                        <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false}}/>
                        <Stack.Screen name="Consent" component={InitialConsent} options={{ headerShown: false}}/>
                        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false}}/>
                        <Stack.Screen name="CreatePIN" component={CreatePin} options={{ headerShown: false}}/>
                        <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />               
                    </Stack.Navigator> 
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    )
}