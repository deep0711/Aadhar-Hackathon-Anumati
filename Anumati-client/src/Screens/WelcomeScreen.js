import React , { useEffect } from "react";
import { Image, View , StyleSheet , ActivityIndicator, ImageBackground} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import aadharLogo from '../assets/Aadhar-Color.png';
import { connect } from "react-redux";

import Bg from '../assets/BG2.jpg';

import * as Permissions from 'expo-permissions'
const DELAY_TIME = 3000;

function WelcomeScreen( props ) {

    const fetchData = async() => {
        await props.checkForUserToken();
        setTimeout(async () => {
            try {
                const value = await AsyncStorage.getItem('userToken');
                if (value === null) {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tutorial'}]
                    });
                }  else {
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'CreatePIN'}]
                    });
                }
            } catch(err) {
                console.log(err);
            }
        } , DELAY_TIME);
    }
    useEffect(() => {
        const checkPermissions = async() => {
            const { status } = await Permissions.getAsync(
                Permissions.LOCATION_BACKGROUND, 
                Permissions.NOTIFICATIONS
            );
            if ( status !== 'granted') {
                const { status } = await Permissions.askAsync(
                    Permissions.LOCATION_BACKGROUND,
                    Permissions.NOTIFICATIONS
                );
                if (status === 'granted') { 
                    await fetchData();
                } 
            } else {
                await fetchData();
            }
        }
        checkPermissions();
    } , []);

    return(
        <ImageBackground
            source={Bg}
            resizeMode="cover"
            style={{flex:1}}
        >
            <View style={ styles.container }>
                <Image source={aadharLogo} style={ styles.logo }/>
                <ActivityIndicator size="large" color="black" style={{marginTop: 100}}/>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = ( state ) => {
    const { tokenFound } = state.LocalStorageReducer;   
    return {
        loginStatus : tokenFound,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        checkForUserToken: async() => { 
            try {
                const value = await AsyncStorage.getItem('userToken');
                const aadharCardNumber = await AsyncStorage.getItem('aAdharNumber');
                const mPin = await AsyncStorage.getItem('mPin');
                if (value !== null) {
                    dispatch({ type: 'TOKEN_FOUND' , aNumber: aadharCardNumber , _mPin: mPin}); 
                }  
            } catch(err) {
                console.log(err);
            }
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 190,
        height: 120,
        alignSelf:'center',
    }
})