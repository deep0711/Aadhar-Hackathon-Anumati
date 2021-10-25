import React , { useEffect } from "react";
import { Image, View , StyleSheet , ActivityIndicator, ImageBackground , PermissionsAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import aadharLogo from '../assets/Aadhar-Color.png';
import { connect } from "react-redux";
import Bg from '../assets/BG2.jpg';

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
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);
                if(
                    granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' && 
                    granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
                ) {
                    fetchData();
                } 
            } catch(error) {
                console.log(error);
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