import React , { useState,useEffect } from "react";
import Logo from '../assets/Aadhar-Color.png';
import { Button , Input ,useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuid_v4 } from 'uuid';
import { View , Image , StyleSheet, ImageBackground , Text} from "react-native";
import Bg from '../assets/BG2.jpg';
import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';

function MobileRegistrationScreen( props ) {

    const [MobileNo , setMobileNo] = useState('');
    const [Name,setName] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [otp,setOtp] = useState('');
    const [OTPgenerated ,setOTPgenerated ] = useState('');
    const [otpSent,setOtpSent] = useState(false);
    
    const toast = useToast();
            
    const handleSubmit = async() => {
        setIsLoading(true);
        console.log(MobileNo);
        if (MobileNo.length === 10) {
            try {
                await AsyncStorage.setItem('aAdharNumber', MobileNo);
                await AsyncStorage.setItem('name',Name);
                const digits = '0123456789';
                let otp = '';
        
                for (let i =0; i < 6; i++) 
                {
                    otp += digits[Math.floor(Math.random() * 10)];
                }

                setOTPgenerated(otp);
                console.log(otp);
                const body = "Hi from Anumati! Your OTP is " + otp + ".Thank You";                
                fetch('https://anumati.herokuapp.com/anumati-server/send-sms',{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',  // It can be used to overcome cors errors
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "Mobile" :MobileNo,
                        "Message" : body
                    })
                }).then(async function(response){
                    setIsLoading(false);
                    setOtpSent(true);
                    toast.show({
                        title: "OTP Sent Successfully",
                        status: "success",
                        duration: 3000,
                        variant: "outline-light"
                    });
                    console.log("OTP Sent Successfully");
                })
                //Communications.text(MobileNo,"Your OTP is"+otp.toString())
            } catch(e) {
                setIsLoading(false);
                console.log(e);
            }
        } else {
            console.log('Mobile Number must be 10 Digit Long!');
            setIsLoading(false);

            toast.show({
                title: "Wrong Input",
                status: "error",
                description: "Mobile Number must be 10 digit long!  ",
                duration: 5000,
                variant: "outline-light"
            });
        }
    }
    const OTPSubmit = async () => {
        try{
            setIsLoading(true);
            if(OTPgenerated == otp){
                
                toast.show({
                    title: "Login Succesful",
                    status: "success",
                    duration: 3000,
                    variant: "outline-light"
                });
                //Storing Token for Push Notification
                
                setIsLoading(false);
                props.navigation.navigate('CreatePIN');
            }else{
                toast.show({
                    title: "Wrong OTP",
                    status: "error",
                    description: "Try Again",
                    duration: 5000,
                    variant: "outline-light"
                });
                setIsLoading(false);
            }
        }catch(err){
            console.log(err);
            toast.show({
                title: "Server Error.Please Try again",
                status: "error",
                duration: 3000,
                variant: "outline-light"
            });
            setIsLoading(false);
        }
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
                    placeholder="Enter your Full Name"
                    onChangeText={text => setName(text)}
                    mb="5"
                />
                <Input 
                    variant="filled" 
                    placeholder="Enter 10 Digit Mobile Number"
                    keyboardType="number-pad"
                    onChangeText={text => setMobileNo(text)}
                    mb="5"
                />
                
                {otpSent ?
                    <>
                    <Input 
                    variant="filled" 
                    placeholder="Enter OTP sent to your mobile"
                    keyboardType="number-pad"
                    onChangeText={text => setOtp(text)}
                    />
                    <Button 
                    isLoading={isLoading} 
                    isLoadingText="" 
                    style={{marginTop: 15 , marginLeft: 15 , marginRight: 15}}
                    onPress={() => OTPSubmit()}
                    >
                    Submit OTP
                    </Button></>: 
                    <Button 
                        isLoading={isLoading} 
                        isLoadingText="" 
                        style={{marginTop: 15 , marginLeft: 15 , marginRight: 15}}
                        onPress={() => handleSubmit()}
                    >
                    Submit
                </Button>}
            </View>
        </ImageBackground>
    )
}

export default MobileRegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        marginBottom:40

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