import React , { useState,useEffect } from "react";
import Logo from '../assets/Aadhar-Color.png';
import { Divider , Button , Input ,useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuid_v4 } from 'uuid';
//import * as Notifications from 'expo-notifications';
import { View , Image , StyleSheet, ImageBackground , Text} from "react-native";
import Bg from '../assets/BG2.jpg';

function RegistrationScreen( props ) {

    const [aadharNo , setAadharNo] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [captchaTxnId, setCaptchaTxnId] = useState('');
    const [txnId,setTxnId] = useState('');
    const [otp,setOtp] = useState('');
    const [otpSent,setOtpSent] = useState(false);
    const [base64Icon,setIcon] = useState('https://cdn-icons-png.flaticon.com/512/1040/1040252.png');

    const toast = useToast();
            
    useEffect(() => {
        async function fetchCaptcha(){
            setOtpSent(false);
            //Calling Captcha API for setting up captcha
            setIsLoading(true);
            try{
                fetch('https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    "langCode": "en",
                    "captchaLength": "5",
                    "captchaType": "2"
                })
                }).then( response => response.json()
                ).then(function(response) {
                    console.log("Captcha Response:",response);
                    if(response["statusCode"] == 200)
                    {
                        setCaptchaTxnId(response["captchaTxnId"]);
                        setIcon('data:image/png;base64,'+response["captchaBase64String"]);
                        setIsLoading(false);
                    }else{
                        console.log("Error 1:",response);
                        setIsLoading(false);
                    }
                }).catch( err => console.log(err));
            }catch(err){
                    console.log("Error occured while Generating Captcha :",err);
                    setIsLoading(false);
            }
        }    
        fetchCaptcha();
    }, []);

    const handleSubmit = async() => {
        setIsLoading(true);
        console.log(aadharNo);
        console.log(captchaTxnId);
        console.log(captcha);
        if (aadharNo.length === 12) {
            try {
                await AsyncStorage.setItem('aAdharNumber', aadharNo);

                fetch('https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'x-request-id':uuid_v4().toString(),
                        'appid':"MYAADHAAR",
                        'Accept-Language':'en_in'
                    },
                    body:JSON.stringify({
                        "uidNumber": aadharNo.toString(),
                        "captchaTxnId":captchaTxnId.toString(),
                        "captchaValue":captcha.toString(),
                        "transactionId":'MYAADHAAR:'+uuid_v4()
                    })
                }).then(response => response.json()
                ).then(function(response){
                    console.log("OTP REsponse",response);
                    if(response["status"] == "Success")
                    {
                        toast.show({
                            title: "OTP Sent to your Mobile",
                            status: "success",
                            duration: 3000,
                            variant: "outline-light"
                        });
                        setOtpSent(true);
                        setTxnId(response["txnId"]);
                        props.navigation.navigate('CreatePIN');
                    }else if(response["type"] == "UNABLE_TO_REACH_AUTH_SERVICE_ERROR"){
                        toast.show({
                            title: "Entered Aadhar does not exist.Try Again",
                            status: "error",
                            duration: 3000,
                            variant: "outline-light"
                        });
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Registration'}]
                        });
                    }else{
                        toast.show({
                            title: "Captcha is Wrong",
                            status: "error",
                            duration: 3000,
                            variant: "outline-light"
                        });
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Registration'}]
                        });
                    }

                    setIsLoading(false);
            }).catch(err => {console.log(err);setIsLoading(false);});
            } catch(e) {
                setIsLoading(false);
                console.log(e);
            }
        } else {
            console.log('Aadhar Number must be 12 Digit Long!');
            setIsLoading(false);

            toast.show({
                title: "Wrong Input",
                status: "error",
                description: "Aadhar Number must be 12 Digit Long!  ",
                duration: 5000,
                variant: "outline-light"
            });
        }
    }

    const OTPSubmit = async () =>{
        try{
        setIsLoading(true);
        console.log(aadharNo);
        fetch('https://stage1.uidai.gov.in/eAadhaarService/api/downloadOfflineEkyc',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "txnNumber": txnId,
                "otp":otp,
                "shareCode":2469,
                "uid":aadharNo
            })
        }).then(response => response.json()
        ).then(async function(response){
            console.log("Data response:",response);
            if(response["status"] == "Success"){

                //Data Fetch Successful and store the data in encrypted manner in Async storage-to be done
                toast.show({
                    title: "Registration Succesful",
                    status: "success",
                    duration: 3000,
                    variant: "outline-light"
                });
                setIsLoading(false);

                //Storing Token for Push Notification
                
                const token = AsyncStorage.getItem('ExpoToken');
                console.log(token);

                const response = await fetch('http://localhost:8000/anumati-server/store-token',{
                    method:'POST',
                    body:JSON.stringify({
                        "Aadhar" :aadharNo,
                        "Token" : token
                    })
                })
                
                if(typeof response.error == 'undefined')
                {
                    console.log("Push Token Stored successfully");
                }
                
                props.navigation.navigate('CreatePIN');
            }else{
                toast.show({
                    title: "Wrong OTP",
                    status: "error",
                    description: "Try Again",
                    duration: 5000,
                    variant: "outline-light"
                });
            }
            setIsLoading(false);
        }).catch(err => {console.log(err);setIsLoading(false);})
    }catch(err){ console.log(err)};
    }

    return(
        <ImageBackground
            source={Bg}
            resizeMode="cover"
            style={{flex: 1}}
            blurRadius={1} 
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo}/>
                </View>
                
                <Text style={{fontSize: 25 , textAlign: 'center' , marginTop: 40}}>Welcome to ANUMATI </Text>
                <Text style={{fontSize: 13 , textAlign: 'center'}}> Address Update Made Easy </Text>
                
            </View>
            
            <View style={styles.formContainer}>
                <Input 
                    variant="filled" 
                    placeholder="Enter 12 Digit Aadhar Number"
                    keyboardType="number-pad"
                    onChangeText={text => setAadharNo(text)}
                />
                <Image resizeMode="contain" style={{width: '100%', height: 90,marginTop:20,marginBottom:20}} source={{uri: base64Icon}}/>
                <Input 
                    variant="filled" 
                    placeholder="Enter Captcha"
                    onChangeText={text => setCaptcha(text)}
                />
                
                {otpSent ?
                    <>
                    <Input 
                    variant="filled" 
                    placeholder="Enter OTP sent to your mobile"
                    keyboardType="number-pad"
                    onChangeText={text => setOtp(text)}
                    style={{marginTop:20}}
                    />
                    <Button 
                    isLoading={isLoading} 
                    isLoadingText="..." 
                    style={{marginTop: 15 , marginLeft: 15 , marginRight: 15}}
                    onPress={() => OTPSubmit()}
                    >
                    Submit OTP
                    </Button></>: 
                    <Button 
                        isLoading={isLoading} 
                        isLoadingText="..." 
                        style={{marginTop: 15 , marginLeft: 15 , marginRight: 15}}
                        onPress={() => handleSubmit()}
                    >
                    Submit
                </Button>}
            </View>
        </ImageBackground>
    )
}

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 3, 
        marginRight:20,
        marginLeft:20,
        padding: 20,
    },
    logo : {
        width: 190,
        height: 120,
        alignSelf:'center',
    }
})