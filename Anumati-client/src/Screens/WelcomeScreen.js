import React , { useEffect,useRef,useState } from "react";
import { Image, View , StyleSheet , ActivityIndicator, ImageBackground,PermissionsAndroid, Platform} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import aadharLogo from '../assets/Aadhar-Color.png';
import { connect } from "react-redux";
import Bg from '../assets/BG2.jpg';
import * as Notifications from 'expo-notifications';

const DELAY_TIME = 3000;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

function WelcomeScreen( props ) {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    
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
        fetchData();
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
                    console.log("Token Already Present");
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