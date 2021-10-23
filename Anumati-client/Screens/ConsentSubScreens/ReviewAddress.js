import React, { useState } from 'react';
import { View } from 'react-native';
import {Box, 
    Heading, 
    Center, 
    useTheme, 
    Button, 
    FormControl, 
    Input, 
    ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../../Components/Card';
import { setStatusBarTranslucent } from 'expo-status-bar';

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
const ReviewForm = ({ handleSubmit }) => (
    <Box m="10" width="72" > 
        <Heading mb="5">
            Review Details
        </Heading>
        <Box >
        <FormControl mb="5" >
          <FormControl.Label>House/Bldg/Apt</FormControl.Label>
          <Input 
          type="string" 
          value="12345" 
          placeholder="option entry" />
          <FormControl.HelperText>
            If any update to be made
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
            <Input placeholder="fetch and show" />
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
            <Input placeholder="landmark" />
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
            <Input placeholder="Area/locality/sector" />
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
            <Input placeholder="village" />
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
            <Input placeholder="district" />
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
            <Input placeholder="post office" />
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
            <Input placeholder="post office" />
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
            <Input placeholder="pin code" />
        </FormControl>
        </Box>
        <Button
        onPress={ handleSubmit }
        mb="10"
        size="lg"
        colorScheme="secondary">
            Reviewed
        </Button>
    </Box>
);

export default function ReviewAddress({ setCurrent }) {
    const {colors} = useTheme();
    const [openForm, setOpen] = useState(false);

    const handleButton = () => {
        setOpen(true);
    };
    const handleSubmit = () => {
        //post reviewed data 
        console.log("reviewed");
        setCurrent(3);
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
                handleSubmit={ handleSubmit } /> : 
                <Description
                colors={colors}
                handleButton={handleButton} /> }
            </Card>   
            </ScrollView>
        </Box>     
    </View>
    )
}