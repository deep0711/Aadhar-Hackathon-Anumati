import React , { useEffect,useRef,useState } from "react";
import { Image, View , StyleSheet , ActivityIndicator, ImageBackground,PermissionsAndroid, Platform} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import aadharLogo from '../assets/Aadhar-Color.png';
import { connect } from "react-redux";
import Bg from '../assets/BG2.jpg';
import * as Notifications from 'expo-notifications';
import base64 from 'react-native-base64';
import JSZip from 'jszip';
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

        const checkPermissions = async() => {
            try {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                ]);
                const checkLocation = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
                const checkMedia = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE );
                
                if(checkLocation && checkMedia) {
                    console.log("Location and Media Permission Granted");
                    const token = await requestNotification();
                    await AsyncStorage.setItem('ExpoToken',token["data"]);

                    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                        setNotification(notification);
                    });
                  
                    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                    console.log(response);
                    });
                    
                    await fetchData();
                }else{
                    console.log("Permission not granted for Location and Media");
                } 
            } catch(error) {
                console.log(error);
            }  
        }

        const requestNotification = async() => {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log("Permission not granted");
                return;
            }
            console.log("Notification Permission granted");
            token = await Notifications.getExpoPushTokenAsync({
                experienceId: '@goprone/example',
            });

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
                }
            return token;
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