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

const AadhaarFront = ({ colors,photo, name, aadharNo, DOB, Gen}) => (
    <Box
        width="80"
        height="64"
        rounded="lg"
        bgColor="#F7BA0A"
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
                        uri: photo
                    }}
                    alt="profile image"
                    size="md"
                    />
                    <Box
                    ml="5"
                    display="flex"
                    flexDirection="column">
                    <Heading size="sm" >
                        {name}
                    </Heading>
                    <Text>Date of Birth: {DOB}</Text>
                    {Gen=="M" ? <Text>Male</Text> : <Text>Female</Text>}
                    </Box>
                </Box>
            <Heading size="md">
                {aadharNo}
            </Heading>
            </Center>    
        </Box>
);
const AadhaarBack = ({ colors,aadharNo, Country, Dist, LOC, PC, PO, House, State, Vtc, Street, SubDist }) => (
    <Box
        width="80"
        height="64"
        rounded="lg"
        bgColor="#F7BA0A"
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
                    <Text>{House},{Street},{LOC}</Text>
                    <Text>{SubDist},</Text>
                    <Text>{Vtc},</Text>
                    <Text>Post Office-{PO},</Text>
                    <Text>{Dist},</Text>
                    <Text>{State}-{PC}, {Country}</Text>
                </Box>
            
            </Center>    
        </Box>
)
const Aadhaar = ({ colors,photo, name, aadharNo, DOB, Gen, Country, Dist, LOC, PC, PO, House, State, Vtc, Street, SubDist }) => (
    <ScrollView horizontal={true}
                pagingEnabled={true} >
        <AadhaarFront photo={photo.toString()} name={name.toString()} aadharNo={aadharNo} DOB={DOB} Gen={Gen} />
        <AadhaarBack Country={Country} Dist={Dist} LOC={LOC} PC={PC} PO={PO} House={House} State={State} Vtc={Vtc} Street={Street} SubDist={SubDist}/>
    </ScrollView>
);

const AadhaarContainer = ({ colors,photo, name, aadharNo, DOB, Gen, Country, Dist, LOC, PC, PO, House, State, Vtc, Street, SubDist }) => (
    <Center
    borderBottomRadius="20"
    bg="primary.500">
        <Box width="80" mt="10">
        <Text color="white">
                    My Aadhaar
                </Text>
                <Center mt="5" mb="10">
                <Aadhaar photo={photo.toString()} name={name.toString()} aadharNo={aadharNo} DOB={DOB} Gen={Gen} Country={Country} Dist={Dist} LOC={LOC} PC={PC} PO={PO} House={House} State={State} Vtc={Vtc} Street={Street} SubDist={SubDist}/>
        </Center>
        </Box>
    </Center>
);


export default function MyAadhaar({ navigation }) {
    const { colors } = useTheme();
    const [photo,setPhoto] = useState("");
    const [name,setName] = useState("");
    const [aadhar,setAadhar] = useState("");
    const [dob,setDOB] = useState("");
    const [gender,setGender] = useState("");
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
    
    const [count,setCount] = useState(0);

    useEffect(() => {
        const loadData = async () =>{
            setCountry(await AsyncStorage.getItem('country'));
            setDist(await AsyncStorage.getItem('dist'));
            setHouse(await AsyncStorage.getItem('house'));
            setLOC(await AsyncStorage.getItem('loc'));
            setPC(await AsyncStorage.getItem('pc'));
            setPO(await AsyncStorage.getItem('po'));
            setState(await AsyncStorage.getItem('state'));
            setStreet(await AsyncStorage.getItem('street'));
            setSubDist(await AsyncStorage.getItem('subdist'));
            setVtc(await AsyncStorage.getItem('vtc'));
            setPhoto("data:image/png;base64," + await AsyncStorage.getItem('photo'));
            setName(await AsyncStorage.getItem('name'));
            setAadhar(await AsyncStorage.getItem('aAdharNumber'));
            setDOB(await AsyncStorage.getItem('dob'));
            setGender(await AsyncStorage.getItem('gender'));
            setCount(1);
        }
        loadData();
    }, []);

    if(count == 0)
    {
        return(
            <></>
        )
    }
    return (
        <>
        <StatusBar backgroundColor={colors['primary']['500']} />
        <View style={styles.container}>
            
            <AadhaarContainer photo={photo} name={name} aadharNo={"XXXX XXXX " + aadhar.substring(8)} DOB={dob} Gen={gender} Country={country} Dist={dist} LOC={loc} PC={pc} PO={po} House={house} State={state} Vtc={vtc} Street={street} SubDist={subdist} />

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
