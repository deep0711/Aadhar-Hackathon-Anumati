import React,{useState,useEffect} from 'react';
import Card from '../../Components/Card';
import {View} from 'react-native';
import {Box, Button, Center, Heading, useTheme } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const ConsentSuccess = ({ colors, handlePress }) => (
    <Box m="10">
    <Center>
        <Box mb="5">
        <FontAwesome 
        name="check-circle-o" 
        size={28} 
        color={colors["secondary"]["500"]} />
        </Box>
        <Heading size="lg">
            Consent Approved
        </Heading>
        <Heading size="lg">
            Finish Your Process
        </Heading>
        <Button
        mt="5"
        colorScheme="secondary">
            <Heading 
            onPress={ handlePress }
            color="white"
            size="md">
                Print Consent Form
            </Heading>
        </Button>
    </Center>
    </Box>
);

const ConsentFail = ({ colors, handlePress }) => (
    <Box m="10">
        <Center>
            <Box mb="5">
            <Foundation 
            name="x-circle" 
            size={28} 
            color={colors["error"]["500"]} />
            </Box>
            <Heading size="lg" color={colors["error"]["500"]} >
                Consent Disapproved
            </Heading>
            <Button
            mt="5"
            colorScheme="secondary">
                <Heading 
                onPress={handlePress}
                color="white"
                size="md">
                    Go Home
                </Heading>
            </Button>
        </Center>
    </Box>
);

export default function Verdict({ setCurrent, success=true, navigation,ConsentID,House}) {
    const { colors } = useTheme();
    const [country,setCountry] = useState("");
    const [dist,setDist] = useState("");
    const [house,setHouse] = useState("");
    const [loc,setLOC] = useState("");
    const [pc,setPC] = useState("");
    const [po,setPO] = useState("");
    const [state,setState] = useState("");
    const [street,setStreet] = useState("");
    const [subdist,setSubDist] = useState("");
    const [vtc,setVtc] = useState("");
   
    const handleHome = async () => {
        // reset the consent
        //Print the Consent request;
        await fetch('https://anumati.herokuapp.com/anumati-server/update-consent',{
            method:'POST',
            headers: {
                'Accept': 'application/json',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "Status":"Finish",
                "ConsentID":ConsentID
            })
        }).then(async function(response){
            response = await response.json();
            console.log(response["message"]);
            navigation.navigate('Dashboard');   
        }).catch(err=>console.log(err));
    };
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
          setHouse(response["HouseNumber"])
          setCountry(response["Country"]);
          setDist(response["District"]);
          setLOC(response["Area"]);
          setPC(response["PinCode"]);
          setPO(response["PostOffice"]);
          setState(response["State"]);
          setStreet(response["StreetName"]);
          setSubDist(response["SubDist"]);
          setVtc(response["Village"]);   
      }).catch(err=>console.log(err));
      
  }, [])

    return (
        <View 
    style={{ 
        flex: 1,
        alignItems: "center", 
        }}>
            <Box mt="10">
            <Card>
                { success ? <ConsentSuccess 
                handlePress={ handleHome }
                colors={colors} /> : 
                <ConsentFail 
                handlePress={ handleHome }
                colors={colors} /> }
            </Card>
            </Box>
        </View>
    );
}