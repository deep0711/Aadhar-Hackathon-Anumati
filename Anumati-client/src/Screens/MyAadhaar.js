import React,{useState,useEffect} from 'react';
import { Box, 
    Image, 
    Heading, 
    Text, 
    Button, 
    useTheme, 
    Center } from 'native-base';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const AadhaarFront = ({ colors, name, aadharNo}) => (
    <Box
        width="80"
        height="64"
        rounded="lg"
        bgColor="secondary.400"
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
                    borderRadius={100}
                    />
                    <Box
                    ml="5"
                    >
                    <Heading size="sm" >
                        {name}
                    </Heading>
                    </Box>
                </Box>
            <Heading size="md">
                {aadharNo}
            </Heading>
            </Center>    
        </Box>
);
const AadhaarBack = ({ colors }) => (
    <Box
        width="80"
        height="64"
        rounded="lg"
        bgColor="secondary.400"
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
                </Box>
            
            </Center>    
        </Box>
)
const Aadhaar = ({ colors, name, aadharNo}) => (
    <ScrollView horizontal={true}
                pagingEnabled={true} >
        <AadhaarFront name={name.toString()} aadharNo={aadharNo} />
        <AadhaarBack/>
    </ScrollView>
);

const AadhaarContainer = ({ colors, name, aadharNo}) => (
    <Center
    borderBottomRadius="20"
    bg="primary.500">
        <Box width="80" mt="10">
        <Text color="white">
                    My Aadhaar
                </Text>
                <Center mt="5" mb="10">
                <Aadhaar name={name.toString()} aadharNo={aadharNo} />
        </Center>
        </Box>
    </Center>
);


export default function MyAadhaar({ navigation }) {
    const { colors } = useTheme();
    const [name,setName] = useState("");
    const [aadhar,setAadhar] = useState("");
    
    const [count,setCount] = useState(0);

    useEffect(() => {
        const loadData = async () =>{
            setName(await AsyncStorage.getItem('name'));
            setAadhar(await AsyncStorage.getItem('aAdharNumber'));
            setCount(1);
        }
        loadData();
    }, []);

    if(count == 0)
    {
        return(
            <Loader/>
        )
    }
    return (
        <>
        <StatusBar backgroundColor={colors['primary']['500']} />
        <View style={styles.container}>
            
            <AadhaarContainer name={name} aadharNo={"+91 " + aadhar}  />

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
