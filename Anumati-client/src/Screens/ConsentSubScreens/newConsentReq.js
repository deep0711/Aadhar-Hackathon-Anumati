import React, { useState } from 'react';
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
import Card from '../../Components/Card';
import { FontAwesome } from '@expo/vector-icons';

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

const ConsentForm = ({ aadhar, handleChange, handleSubmit }) => {
    
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
                    value={aadhar} 
                    onChange={ handleChange }
                    placeholder="enter the Aadhar number here"/>
                    <FormControl.HelperText>
                        Must be 16 digit.
                    </FormControl.HelperText>
                </FormControl>
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
                </Button>
            </Box> );
    }

export default function NewConsentReq({ setCurrent }) {
    const [openForm, setOpen ] = useState(false);
    const [aadhar, setAadhar] = useState('');

    const handleButton = () => {
        setOpen(true);
    };
    const handleChange = (event) => {
        setAadhar(event.target.value);
    };
    const handleSubmit = () => {
        //post reqest Aadhar number
        console.log("submit form ");
        setCurrent(1);
    };

    return <View 
    style={{ 
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Card>
                { openForm ? <ConsentForm 
                aadhar={aadhar} 
                handleChange={ handleChange } 
                handleSubmit={ handleSubmit } /> : 
                <Description 
                handleButton={handleButton} /> }
            </Card>
    </View>
}