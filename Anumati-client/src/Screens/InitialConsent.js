import { Button, Heading } from 'native-base';
import React from 'react';
import { View , Text, ImageBackground , StatusBar } from 'react-native';
import Bg from '../assets/BG2.jpg';


const InitialConsent = ( props ) => {
    return(
        <>  
            <StatusBar />
            <ImageBackground
                source={Bg}
                resizeMode="cover"
                style={{flex: 1 , justifyContent: 'center'}}
                //blurRadius={} 
            >
                <View style = {{width: 350 , height: 650 , alignSelf: 'center' , marginTop: 10 , padding: 10, backgroundColor:'transparent'}}>
                    <Heading style={{textAlign: 'center' , fontSize: 30}}> Resident Consent </Heading>
                    <View style={{marginTop: 20}}> 
                        <Text style={{textAlign: 'center' , fontSize: 18}}>
                            Read the following and provide your Consent by tapping on 'I Consent Button'
                            UIDAI collects your Aadhar Number and OTP in Anumati:{'\n'}
                        </Text>
                        <Text style = {{fontSize: 15 , textAlign: 'left'}}>
                            1. To Lock and Unlock your biometrics as and when requested by you through Anumati application{'\n'}{'\n'}
                            2. To Update your Anumati Profile{'\n'}{'\n'}
                            3. To View Notification Tab{'\n'}{'\n'}
                            4. To generate and fetch VID{'\n'}{'\n'}
                            5. To Check any of the status requested{'\n'}{'\n'}
                            6. To help download Proof of Adress after update{'\n'}{'\n'}
                            7. To help submit request for Address update or Aaddress Validation Letter Request Services{'\n'}
                        </Text>
                    </View>
                    <Button backgroundColor="#7D9BFF"
                        onPress={() => {
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Registration'}]
                            });
                        }}
                    > I Consent </Button>
                </View>
            </ImageBackground>
        </>
    )
}

export default InitialConsent;