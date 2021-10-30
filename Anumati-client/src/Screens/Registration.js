import React , { useState,useEffect } from "react";
import Logo from '../assets/Aadhar-Color.png';
import { Button , Input ,useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuid_v4 } from 'uuid';
import { View , Image , StyleSheet, ImageBackground , Text} from "react-native";
import Bg from '../assets/BG2.jpg';
import Loader from './Loader';

function RegistrationScreen( {navigation,route} ) {

    const [aadharNo , setAadharNo] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [captchaTxnId, setCaptchaTxnId] = useState('');
    const [txnId,setTxnId] = useState('');
    const [otp,setOtp] = useState('');
    const [otpSent,setOtpSent] = useState(false);
    const [base64Icon,setIcon] = useState('https://cdn-icons-png.flaticon.com/512/1040/1040252.png');
    const [isLoaderLoading,setIsLoaderLoading] = useState(true);

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
        setTimeout(() => {
            setIsLoaderLoading(false);
        }, 2000);
        fetchCaptcha();
    }, []);

    const handleSubmit = async() => {
        setIsLoading(true);
        console.log(aadharNo);
        console.log(captchaTxnId);
        console.log(captcha);
        if (aadharNo.length === 12) {
            try {
                
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
                        //props.navigation.navigate('CreatePIN');
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
            
            if(response["status"] == "Success"){
                var ekycxml = response["eKycXML"];
                var fileName = response["fileName"];
                //console.log(ekycxml);
                //console.log(fileName);
                
                fetch('https://anumati.herokuapp.com/anumati-server/unzip-xml',{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',  // It can be used to overcome cors errors
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "base64xml" :ekycxml,
                        "filename" : fileName
                    })
                }).then(async (response) => {
                    try{
                        response = await response.json();
                        response = await JSON.parse(response);
                        const data = response;
                        //console.log("Unzip Data is ",data);
                        //console.log("Hello ",data.OfflinePaperlessKyc)
                        if(typeof response["error"] == 'undefined')
                        {
                            const poa = data['OfflinePaperlessKyc']['UidData']['Poa'];

                            await fetch('https://anumati.herokuapp.com/anumati-server/update-consent',{
                                method:'POST',
                                headers: {
                                    'Accept': 'application/json',  // It can be used to overcome cors errors
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify({
                                    "Status":"Approved",
                                    "ConsentID":route.params.ConsentId
                                })
                            }).then(async function(response){
                                response = await response.json();
                                console.log(response["message"]);
                                const body = "Hi from Anumati! Your Consent Request from +91 " + response["ApproverAadhar"] + " got Approved.Thank You";                
                                fetch('https://anumati.herokuapp.com/anumati-server/send-sms',{
                                    method:'POST',
                                    headers: {
                                        'Accept': 'application/json',  // It can be used to overcome cors errors
                                        'Content-Type': 'application/json'
                                    },
                                    body:JSON.stringify({
                                        "Mobile" :response["RequesterAadhar"],
                                        "Message" : body
                                    })
                                }).then(async function(response){
                                    console.log("Notification Sent Successfully");
                                    await fetch('https://anumati.herokuapp.com/anumati-server/store-address',{
                                        method:'POST',
                                        headers: {
                                            'Accept': 'application/json',  // It can be used to overcome cors errors
                                            'Content-Type': 'application/json'
                                        },
                                        body:JSON.stringify({
                                            "ConsentID":route.params.ConsentId,
                                            HouseNumber : poa['house'],
                                            StreetName : poa['street'],
                                            Landmark :poa['landmark'],
                                            Area : poa['loc'],
                                            Village : poa['vtc'],
                                            District : poa['dist'],
                                            PostOffice : poa['po'],
                                            State : poa['state'],
                                            PinCode : poa['pc']
                                        })
                                    }).then(async function(response){
                                        response = await response.json();
                                        console.log(response["message"]);
                                        toast.show({
                                            title: "Consent Approved Successfully",
                                            status: "success",
                                            duration: 3000,
                                            variant: "outline-light"
                                        });
                                        setIsLoading(false);  
                                        navigation.navigate('NotificationHome'); 
                                        }).catch(err=>console.log(err));
                                    })
                            }).catch(err=>console.log(err));
                            
                            //Storing Token for Push Notification
                            setIsLoading(false);

                            navigation.navigate('NotificationHome');
                            
                        }else{
                            toast.show({
                                title: "Data Fetching Failed.Please Try again",
                                status: "error",
                                duration: 3000,
                                variant: "outline-light"
                            });
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Registration'}]
                            });
                            setIsLoading(false);
                        }
                    }catch(err){
                        toast.show({
                            title: "Server Error.Please Try again",
                            status: "error",
                            duration: 3000,
                            variant: "outline-light"
                        });
                    }    
                })        
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
        }).catch(err => {console.log(err);setIsLoading(false);})
    }catch(err){ console.log(err)};
    }

    if(isLoaderLoading){
        return(
            <Loader/>
        )
    }else{
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
                    
                    <Text style={{fontSize: 25 , textAlign: 'center' , marginTop: 40}}>ANUMATI </Text>
                    <Text style={{fontSize: 13 , textAlign: 'center'}}>Please Enter your Aadhar to Approve </Text>
                    
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