import React, { useState,useEffect } from 'react';
import { View,PermissionsAndroid,Alert } from 'react-native';
import {Box, 
    Heading, 
    Center, 
    useTheme, 
    Button, 
    FormControl, 
    Input, 
    ScrollView,useToast } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../../Components/Card';
import { setStatusBarTranslucent } from 'expo-status-bar';
import * as Location from 'expo-location';

const Description = ({ colors, handleButton }) => (
    <Center m="10" >
        <Box mb="5">
            <FontAwesome 
            name="check-circle-o" 
            size={28} 
            color={ colors["secondary"]["500"] } />
        </Box>
        <Heading size="md">
            Consent Approved 
        </Heading>
        <Heading size="md">
            Now Review the details
        </Heading>
        <Button 
        onPress={ handleButton }
        mt="5"
        size="lg"
        colorScheme="secondary" >
            Review
        </Button>
    </Center>
);
const ReviewForm = ({ handleSubmit,Country, Dist, LOC, PC, PO, House, State, Vtc, Street, SubDist,OnChange,loading }) => (
    <Box m="10" width="72" > 
        <Heading mb="5">
            Review Details
        </Heading>
        <Box >
        <FormControl mb="5" >
          <FormControl.Label>House/Bldg/Apt</FormControl.Label>
          <Input 
          type="string" 
          value={House}
          onChangeText={text => OnChange(text)} 
          placeholder={House} />
          <FormControl.HelperText>
            This field is editable
          </FormControl.HelperText>
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              Street/Road/Lane
            </FormControl.Label>
            <Input placeholder={Street} />
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              Land Mark
            </FormControl.Label>
            <Input placeholder={SubDist} />
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              Area/Locality/sector
            </FormControl.Label>
            <Input placeholder={LOC} />
        </FormControl>
         <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              Village/Town/City
            </FormControl.Label>
            <Input placeholder={Vtc} />
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              District
            </FormControl.Label>
            <Input placeholder={Dist} />
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              Post Office
            </FormControl.Label>
            <Input placeholder={PO} />
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              State
            </FormControl.Label>
            <Input placeholder={State} />
        </FormControl>
        <FormControl isDisabled mb="5">
            <FormControl.Label
              _disabled={{
                _text: {
                  color: "gray.400",
                  fontWeight: "bold",
                },
              }}
            >
              PIN Code
            </FormControl.Label>
            <Input placeholder={PC} />
        </FormControl>
        </Box>
        {loading ? <Button
        mb="10"
        size="lg"
        colorScheme="secondary">
            Submitting...
        </Button> : 
        <Button
        onPress={ handleSubmit }
        mb="10"
        size="lg"
        colorScheme="secondary">
            Submit
        </Button>}
    </Box>
);

export default function ReviewAddress({ setCurrent,ConsentID,setHouse,House }) {
    const {colors} = useTheme();
    const [openForm, setOpen] = useState(false);
    const [country,setCountry] = useState("");
    const [dist,setDist] = useState("");
    const [house,setHouseN] = useState("");
    const [loc,setLOC] = useState("");
    const [pc,setPC] = useState("");
    const [po,setPO] = useState("");
    const [state,setState] = useState("");
    const [street,setStreet] = useState("");
    const [subdist,setSubDist] = useState("");
    const [vtc,setVtc] = useState("");
    const [loading,setLoading] = useState(false);
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [CurrentAddressDistrict,setDisplayCurrentAddressDistrict] = useState('');
    const [CurrentAddressCity,setDisplayCurrentAddressCity] = useState('');
    const [CurrentAddressPC,setDisplayCurrentAddressPC] = useState('');
    const [CurrentAddressStreet,setDisplayCurrentAddressStreet] = useState('');
    const toast = useToast();
    
   
    useEffect(() => {
      fetch('https://anumati.herokuapp.com/anumati-server/get-address',{
          method:'POST',
          headers: {
              'Accept': 'application/json',  // It can be used to overcome cors errors
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
              "ConsentID":ConsentID,
          })
      }).then(async function(response){
          response = await response.json();
          console.log("Address Received is",response);
          setCountry(response["Country"]);
          setDist(response["District"]);
          setHouseN(response["HouseNumber"]);
          setLOC(response["Area"]);
          setPC(response["PinCode"]);
          setPO(response["PostOffice"]);
          setState(response["State"]);
          setStreet(response["StreetName"]);
          setSubDist(response["SubDist"]);
          setVtc(response["Village"]);   
      }).catch(err=>console.log(err));
      
  }, [])
  
  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(true);
    }
  };
  
  const GetCurrentLocation = async () => {
    try{
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        return false;
      }

      let { coords } = await Location.getCurrentPositionAsync();
      
      console.log(coords);
    
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
    
        for (let item of response) {
          let address = `${item.name},${item.district} , ${item.street}, ${item.postalCode}, ${item.city}`;
          console.log(address);
          
          setDisplayCurrentAddressDistrict(item.district);
          setDisplayCurrentAddressPC(item.postalCode);
          setDisplayCurrentAddressStreet(item.street);
          setDisplayCurrentAddressCity(item.city);
        }

        return true;
      }else{
        return false;
      }
    }catch(err){

      console.log("Error while using Location",err);
      return false;
    }  
  };

  const handleButton = () => {
        setOpen(true);
    };
    const handleSubmit = async () => {
        setLoading(true);
        console.log("reviewed");
        
        //Checking address
        
        await CheckIfLocationEnabled();
        
        if(!locationServiceEnabled)
        { console.log("Location Not Enabled");
          setLoading(false); 
          return;
        }
        const response = await GetCurrentLocation();
        
        if(!response)
          return ;

        if(CurrentAddressPC !== pc || CurrentAddressCity != dist)
        {
          toast.show({
            title: "Current Address Does not match with requested address",
            status: "error",
            duration: 3000,
          });
          setLoading(false);
          return;
        }
        
        await fetch('https://anumati.herokuapp.com/anumati-server/update-address',{
            method:'POST',
            headers: {
                'Accept': 'application/json',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "HouseNumber":house,
                "ConsentID":ConsentID
            })
        }).then(async function(response){
            response = await response.json();
            console.log(response["message"]);
            await fetch('https://anumati.herokuapp.com/anumati-server/update-consent',{
            method:'POST',
            headers: {
                'Accept': 'application/json',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "Status":"Reviewed",
                "ConsentID":ConsentID
            })
        }).then(async function(response){
            response = await response.json();
            console.log(response["message"]);
            
            const body = "Hi from Anumati! Your shared address with +91 "+response["ApproverAadhar"] + "got reviewed and finalised by the User.See on App the Final Address.Thank You";                
              fetch('https://anumati.herokuapp.com/anumati-server/send-sms',{
                  method:'POST',
                  headers: {
                      'Accept': 'application/json',  // It can be used to overcome cors errors
                      'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                      "Mobile" :response["ApproverAadhar"],
                      "Message" : body
                  })
              }).then(async function(response){
                  console.log("OTP Sent Successfully");
                  setLoading(false);
                  setCurrent(3);
              })
               
        }).catch(err=>console.log(err));   
        }).catch(err=>console.log(err));
    }
    const OnChange = (text) => {
      console.log("New House is ",text);
      setHouse(text);
      setHouseN(text);
    }

    return (<View style={{ 
        flex: 1,
        alignItems: "center", 
         }}>
        <Box>
            <ScrollView
            _contentContainerStyle={{
                mt: "10",
                mb: "56"
              }}>
            <Card>
                { openForm ? <ReviewForm 
                handleSubmit={ handleSubmit }
                Country = {country} 
                Dist={dist} 
                LOC={loc} 
                PC={pc}
                PO={po}
                House={house}
                State={state}
                Vtc={vtc}
                Street={street}
                SubDist={subdist} 
                OnChange = {OnChange}
                loading = {loading}
                /> : 
                <Description
                colors={colors}
                handleButton={handleButton} 
                /> }
            </Card>   
            </ScrollView>
        </Box>     
    </View>
    )
}