import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default App(){
    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Consent" component={ConsentScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="CreatePIN" component={CreatePINScreen} options={{ headerShown: false}}/>
                <Stack.Screen name="PINVerification" component={PINVerificationScreen} options={{ headerShown: false}}/>
                
                
         
            </Stack.Navigator> 
        </NavigationContainer>
    )
}