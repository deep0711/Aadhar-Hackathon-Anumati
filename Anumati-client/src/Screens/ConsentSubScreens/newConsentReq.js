import React, { useState,useEffect } from 'react';
import { View } from 'react-native';
import { useTheme, 
    Center,
    Box, 
    Heading, 
    Text, 
    Button, 
    FormControl,
    Stack,
    WarningOutlineIcon,
    Input
} from 'native-base';
import { useToast } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Description = ({ handleButton }) => (
    <Box m="7" width="100%">
        <Center mb="5">
            <FontAwesome 
            name="send-o" 
            size={28} 
            color="black" />
        </Center>
        <Heading 
        mb="5"
        size="md">
            Start a New Consent Request
        </Heading>
        <Button
        size="lg"
        colorScheme="secondary"
        onPress={ handleButton }>
            <Heading 
            size="md"
            color="white">
                Start
            </Heading>
        </Button>
    </Box>
);

const ConsentForm = ({setAadhar, handleSubmit,loading }) => {
    
    return ( <Box m="7" w="100%" >
                <Heading mb="10">
                    Consent Form
                </Heading>
                <FormControl isRequired>
                    <FormControl.Label>
                        Landlord Aadhar Number
                    </FormControl.Label>
                    <Input 
                    keyboardType="numeric"
                    size="xl"
                    onChangeText={text => setAadhar(text)}
                    placeholder="Enter the Aadhar number here"/>
                    <FormControl.HelperText>
                        Must be 12 digit
                    </FormControl.HelperText>
                </FormControl>
                {loading ?<Button
                mt="5"
                size="lg"
                colorScheme="secondary">
                    <Heading 
                    size="md"
                    color="white">
                        Sending...
                    </Heading>
                </Button> :
                <Button
                onPress={handleSubmit}
                mt="5"
                size="lg"
                colorScheme="secondary">
                    <Heading 
                    size="md"
                    color="white">
                        Send Consent
                    </Heading>
                </Button>}
            </Box> );
    }

export default function NewConsentReq({ setCurrent }) {
    const [openForm, setOpen ] = useState(false);
    const [aadhar, setAadhar] = useState("");
    const [loading, setLoading] = useState(false);
    const [RequesterAadhar,setRequesterAadhar] = useState('');
    const [RequesterName, setRequesterName] = useState('');
    const toast = useToast();
    
    
    useEffect(() => {
        const fetchAadhar = async () => {
            const aadharNo = await AsyncStorage.getItem('aAdharNumber');
            const Name = await AsyncStorage.getItem('name');
            setRequesterAadhar(aadharNo);
            setRequesterName(Name);
        }
        fetchAadhar();
    }, [])

    const handleButton = () => {
        setOpen(true);
    };
    const handleSubmit = async () => {
        setLoading(true);
        //console.log("Approver Aadhar is",aadhar);
        //post reqest Aadhar number
        
        fetch('https://anumati.herokuapp.com/anumati-server/create-consent',{
            method:'POST',
            headers: {
                'Accept': 'application/json',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "RequesterAadhar":RequesterAadhar,
                "ApproverAadhar":aadhar,
                "Status":"Pending",
                "attachment":"",
                "RequesterName":RequesterName
            })
        }).then(async function(response){
            //console.log("New Consent Response is ",response);
            response = await response.json();
            console.log("New Consent Response is ",response);
            
            if(response["message"] ==='Consent Generated Successfully')
            {
                console.log("Consent Generated Successfully,",response["ID"]);
                await AsyncStorage.setItem('RequestInProgress','true');
                
                toast.show({
                    title: "Consent Generated Successfully",
                    status: "success",
                    duration: 3000,
                    variant: "outline-light"
                });
                setLoading(false);
                setCurrent(1);
            }else{
                toast.show({
                    title: response["error"],
                    status: "error",
                    duration: 3000,
                    variant: "outline-light"
                });
                setLoading(false);
            }
        }).catch(err=>console.log(err));
        
    };

    return <View 
    style={{ 
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Card>
                { openForm ? <ConsentForm 
                setAadhar = {setAadhar}
                handleSubmit={ handleSubmit }
                loading = {loading} /> : 
                <Description 
                handleButton={handleButton} /> }
            </Card>
    </View>
}