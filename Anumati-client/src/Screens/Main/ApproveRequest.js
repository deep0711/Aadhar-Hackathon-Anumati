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
        console.log("Approving the Consent");
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
            
            await fetch('https://anumati.herokuapp.com/anumati-server/store-address',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',  // It can be used to overcome cors errors
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "ConsentID":route.params.ConsentId,
                    HouseNumber : HouseNumber,
                    StreetName : StreetName,
                    Landmark : Landmark,
                    Area : Area,
                    Village : Village,
                    District : District,
                    PostOffice : PostOffice,
                    State : State,
                    PinCode : PinCode
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
                setLoading(false);  
                navigation.navigate('NotificationHome'); 
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }

    const reject = async () => {
        setLoading(true);
        console.log("Rejecting the Consent");
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
        }).then(async function(response){
            response = await response.json();
            console.log(response["message"]);
            toast.show({
                title: "Consent Rejected Successfully",
                status: "error",
                duration: 3000,
                variant: "outline-light"
            });
            setLoading(false);
            navigation.navigate('NotificationHome');   
        }).catch(err=>console.log(err));
    }
    
    return (<Box flex={1} alignItems="center" justifyContent="center">
        <Box
        maxWidth="4/5"
        borderRadius="md" 
        p="5" 
        shadow={1} 
        bgColor="white">
            <Heading color="muted.600" marginBottom="25">
                Consent Request 
            </Heading>
            <Heading color="muted.500" size="md">
                {route.params.Name}
            </Heading>
            <Heading color="muted.500" size="md" marginBottom="25">
                {"XXXX XXXX "+route.params.Requester.substr(8)}
            </Heading>
            <Heading color="muted.500" size="md">
                You hereby give consent to above user for using your address registered with Aadhar
            </Heading>
            {route.params.Status == "Rejected" ? <Button colorScheme="error" mr="2/5" alignSelf="center">
                        Consent Rejected
                    </Button> : (route.params.Status != "Pending" ? <Button colorScheme="success" mr="2/5" alignSelf="center">
                        Consent Approved
                    </Button> : 
            <Box flexDirection="row" mt="5" al >
                    <Button onPress={reject}  colorScheme="error" ml="1/5" mr="1/6" alignSelf="center">
                        {loading ? "Processing" : "Reject"}
                    </Button>
                    <Button onPress={approve} colorScheme="success" alignSelf="center">
                        {loading ? "Processing" : "Approve"}
                    </Button>
            </Box>
                    )}
        </Box>
    </Box>)
}