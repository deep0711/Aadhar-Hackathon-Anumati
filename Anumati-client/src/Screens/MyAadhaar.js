import React from 'react';
import { Box, 
    Image, 
    Heading, 
    Text, 
    Button, 
    useTheme, 
    Center } from 'native-base';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AadhaarFront = () => (
    <Box
        width="80"
        height="64"
        rounded="lg"
        bgColor="white"
        >
            <Center flex={1} flexDirection="column" p="5">
                <Heading size="md">
                    Government of India
                </Heading>
                <Box 
                display="flex"
                height="4/5"
                flexDirection="row" 
                width="full"
                py="5">
                    <Image 
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }}
                    alt="profile image"
                    size="md"
                    />
                    <Box
                    ml="5"
                    display="flex"
                    flexDirection="column">
                    <Heading size="sm" >
                        Roshan Rai
                    </Heading>
                    <Text>Date of Birth: dd/mm/yyyy</Text>
                    <Text>Male/Female</Text>
                    </Box>
                </Box>
            <Heading size="md">
                1234 1234 1234 1234
            </Heading>
            </Center>    
        </Box>
);
const AadhaarBack = () => (
    <Box
        width="80"
        height="64"
        rounded="lg"
        bgColor="white"
        >
            <Center flex={1} flexDirection="column" p="5">
                <Heading size="md" textAlign="center">
                    UNIQUE IDENTIFICATION AUTHORITY OF INDIA
                </Heading>
                <Box 
                //backgroundColor="red.100"
                display="flex"
                flexDirection="column" 
                width="full"
                p="5">
                    <Text>S/o ABC KUMAR</Text>
                    <Text>Locality/District/LandMark</Text>
                    <Text>Address</Text>
                    <Text>PINCODE, STATE</Text>
                </Box>
            <Heading size="md">
                1234 1234 1234 1234
            </Heading>
            </Center>    
        </Box>
)
const Aadhaar = () => (
    <ScrollView horizontal={true}
                pagingEnabled={true} >
        <AadhaarFront />
        <AadhaarBack />
    </ScrollView>
);

const AadhaarContainer = ({ colors }) => (
    <Center
    borderBottomRadius="20"
    bg="primary.500">
        <Box width="80" mt="10">
        <Text color="white">
                    My AAdhaar
                </Text>
                <Center mt="5" mb="10">
                <Aadhaar/>
        </Center>
        </Box>
    </Center>
);


export default function MyAadhaar({ navigation }) {
    const { colors } = useTheme();
    return (
        <>
        <StatusBar backgroundColor={colors['primary']['500']} />
        <View style={styles.container}>
            
             
            <AadhaarContainer />

            <View style={ styles.body }>
                <Button onPress={async() => {
                        try {
                            await AsyncStorage.removeItem('userToken');
                            await AsyncStorage.removeItem('aAdharNumber');
                            await AsyncStorage.removeItem('mPin');
                            
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Welcome'}]
                            });

                        } catch(err) {
                            console.log(err);
                        }
                    }}>
                        Logout
                </Button>
            </View>

        </View>
        
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomRadious: {
        borderBottomEndRadius: 10
    },
    body: {
        flex: 1, 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center"
    }
})
