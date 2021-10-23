import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import WelcomeScreen from './src/Screens/WelcomeScreen';
import RegistrationScreen from './src/Screens/Registration';
import TabNav from './src/Screens/TabNav';
import CreatePin from './src/Screens/CreatePin';

import Store from './src/Reducers';
import customTheme from './theme.json';
import { NativeBaseProvider, extendTheme } from 'native-base';

export default function App(){
    const Stack = createNativeStackNavigator();
    const theme = extendTheme(customTheme);
    return(
        <Provider store={Store}>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Welcome">
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}}/>
                        {/* <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false}}/>
                        <Stack.Screen name="Consent" component={ConsentScreen} options={{ headerShown: false}}/>
                        <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false}}/>*/}
                        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false}}/>
                        <Stack.Screen name="CreatePIN" component={CreatePin} options={{ headerShown: false}}/>
                        {/* <Stack.Screen name="PINVerification" component={PINVerificationScreen} options={{ headerShown: false}}/> */}
                    
                        <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />               
                    </Stack.Navigator> 
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    )
}