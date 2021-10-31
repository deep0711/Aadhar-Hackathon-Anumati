import React, { useState,useEffect } from 'react';
import { Box, Heading, useTheme, Button,useToast } from 'native-base';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApproveRequest({navigation,route}) {
    const { colors } = useTheme();
    const toast = useToast();
    
    const[HouseNumber , SetHouseNumber] = useState("");
    const[StreetName , SetStreetName] = useState("");
    const[Landmark , SetLandmark] = useState("");
    const[Area , SetArea] = useState("");
    const[Village , SetVillage] = useState("");
    const[District , SetDistrict] = useState("");
    const[PostOffice , SetPostOffice] = useState("");
    const[State , SetState] = useState("");
    const[PinCode , SetPinCode] = useState("");
    const [loading,setLoading] = useState(false);
    
    
    useEffect(() => {
        const getAddress = async () => {
            SetHouseNumber(await AsyncStorage.getItem('house'))
            SetArea(await AsyncStorage.getItem('loc'))
            SetDistrict(await AsyncStorage.getItem('dist'))
            SetLandmark(await AsyncStorage.getItem('landmark'))
            SetPinCode(await AsyncStorage.getItem('pc'))
            SetState(await AsyncStorage.getItem('state'))
            SetPostOffice(await AsyncStorage.getItem('po'))
            SetVillage(await AsyncStorage.getItem('vtc'))
            SetStreetName(await AsyncStorage.getItem('street'))
        }
        getAddress();    
     }, []);
    
    const approve = async () => {
        setLoading(true);
        navigation.navigate("Registration" , 
            {
                ConsentId:route.params.ConsentId
            }
        );
    }

    const reject = async () => {
        setLoading(true);
        await fetch('https://anumati.herokuapp.com/anumati-server/update-consent',{
            method:'POST',
            headers: {
                'Accept': 'application/json',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "Status":"Rejected",
                "ConsentID":route.params.ConsentId
            })
        })
        .then(async function(response){
            response = await response.json();
            const body = "Hi from Anumati! Your Address request from +91 " + response["ApproverAadhar"] + "got rejected by the Approver.Thank You";                
            await fetch('https://anumati.herokuapp.com/anumati-server/send-sms' , {
                  method:'POST',
                  headers: {
                      'Accept': 'application/json',  // It can be used to overcome cors errors
                      'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                      "Mobile" :response["RequesterAadhar"],
                      "Message" : body
                  })
              })
              .then(async function(response) {

                  toast.show({
                    title: "Consent Rejected Successfully",
                    status: "error",
                    duration: 3000,
                    variant: "outline-light"
                });
                setLoading(false);
                navigation.navigate('NotificationHome');  
              })   
        })
        .catch(err => console.log("reject" , err));
    }
    
    return (
        <Box flex={1} alignItems="center" justifyContent="center">
            <Box
                maxWidth="4/5"
                borderRadius="md" 
                p="5" 
                shadow={1} 
                bgColor="white"
            >
                <Heading color="muted.600" marginBottom="25">
                    Consent Request 
                </Heading>
                <Heading color="muted.500" size="md">
                    {route.params.Name}
                </Heading>
                <Heading color="muted.500" size="md" marginBottom="25">
                    {"+91 " + route.params.Requester}
                </Heading>
                <Heading color="muted.500" size="md">
                    You hereby give consent to above user for using your address registered with Aadhar
                </Heading>
                {
                    route.params.Status === "Rejected" ? 
                    <Button colorScheme="error" mr="2/5" alignSelf="center">
                        Consent Rejected
                    </Button> 
                    : 
                    (route.params.Status !== "Pending" ? 
                        <Button colorScheme="success" mr="2/5" alignSelf="center">
                            Consent Approved
                        </Button> 
                        : 
                        <Box flexDirection="row" mt="5" al >
                            <Button onPress={reject}  colorScheme="error" ml="1/5" mr="1/6" alignSelf="center">
                                {loading ? "Processing" : "Reject"}
                            </Button>
                            <Button onPress={approve} colorScheme="success" alignSelf="center">
                                {loading ? "Processing" : "Approve"}
                            </Button>
                        </Box>
                    )
                }
            </Box>
        </Box>
    )
}