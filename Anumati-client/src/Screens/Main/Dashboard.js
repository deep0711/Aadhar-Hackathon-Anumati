import React,{useEffect, useState} from 'react'
import { View, StyleSheet, StatusBar,  TouchableOpacity , RefreshControl, ScrollView} from 'react-native'
import {Box, Center, Heading, Text, Image, Button, useTheme } from 'native-base';
import { FontAwesome , Zocial} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ServiceBtn from '../../Components/ServiceBtn';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../Loader';

const AadhaarPreview = ({name,aadharNo}) => (
        <Box
        rounded="lg"
        width="80"
        bg="secondary.400"
        >
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Image 
                mx="5"
                source={{
                    uri:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }}
                alt="profile image"
                size="sm"
                borderRadius={100} />
                <View style={{ flexDirection: "column", marginHorizontal: 10 }} >
                    <Heading size="md" >
                        {name}
                    </Heading>
                    <Text>
                        {aadharNo}
                    </Text>
                </View>
            </View>
        </Box>
);

const AadhaarContainer = ({name,aadharNo}) => (
    <Box
    borderBottomRadius="20"
    bg="primary.500">
        <Center mt="5" mb="10">
            <Text color="white">
                Updating address made easy
            </Text>
            <Heading m="2" color="white">
                ANUMATI
            </Heading>
            <Box my="5">
            <AadhaarPreview name={name} aadharNo={aadharNo} />
            </Box>
        </Center>
    </Box>
);

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Dashboard({navigation}) {

    //const [photo,setPhoto] = useState("");
    const [name,setName] = useState("");
    const [aadhar,setAadhar] = useState("");
    
    const [count,setCount] = useState(0);
    const [RequestInProgress,setRequest] = useState('');

    const [refreshing, setRefreshing] = React.useState(false);
    
    const loadData = async () => {
        setName(await AsyncStorage.getItem('name'));
        setAadhar(await AsyncStorage.getItem('aAdharNumber'));
        setRequest(await AsyncStorage.getItem('RequestInProgress'));
        setCount(1);
    }

    /**
     * Get Recent Consent
     */
    const getLatestConsetDetail = async() => {
        try {
            setCount(0);
            await fetch("https://anumati.herokuapp.com/anumati-server/get-consent-detail" , {
                method:'POST',
                headers: {
                    'Accept': 'application/json',  // It can be used to overcome cors errors
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "aadhar":aadhar,
                })
            })
            .then(async function (response) {
                response = await response.json();
                const consentArrayLength = response["data"].length;
                setCount(1);
                if(consentArrayLength !== 0) {
                    const item = response["data"][consentArrayLength - 1];
                    response["data"][consentArrayLength - 1]["Status"] !== "Approved" ? 
                    navigation.navigate("Consent Logs",{ ConsentId : item["ConsentID"] })
                    :
                    navigation.navigate("Request-Consent",{ConsentId : item["ConsentID"],Screen:2})
                }
            })
            .catch(err => {
                setCount(1);
                console.log(err);
            });
        } catch (err) {
            setCount(1);
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, [RequestInProgress,aadhar])
    
    const { colors } = useTheme();
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setRequest(await AsyncStorage.getItem('RequestInProgress'));
        wait(2000).then(() => setRefreshing(false));
      }, []);
    if(count === 0){
        return(
            <Loader/>
        )
    }
    return (
        <ScrollView
            refreshControl = {
                <RefreshControl 
                    refreshing = {refreshing}
                    onRefresh = {onRefresh}
                />
            }
            style = {{ flex : 1 }}
        >
        <StatusBar backgroundColor={colors['primary']['500']} />
        <View style={styles.container}>
            <AadhaarContainer name = {name} aadharNo={"+91 " + aadhar} />
            <View style={ styles.body }>
                {
                    RequestInProgress !== "true" ?
                    <ServiceBtn 
                        handlePress={ ()=>{ navigation.navigate('Request-Consent')} }
                        Icon={ <FontAwesome 
                            name="send-o" 
                            size={28} 
                            color={colors["primary"]["500"]} /> }
                        Label="New Resquest Consent" />
                    :
                    <ServiceBtn 
                        Icon = { <Zocial name="statusnet"  size={25} color={colors["primary"]["500"]} /> }
                        Label= "Latest Consent Status"
                        handlePress = {() => {
                            getLatestConsetDetail();
                        }}
                    />
                }
                <ServiceBtn 
                    handlePress={ ()=>{ navigation.navigate('History')} }
                    Icon={ <Ionicons 
                        name="file-tray-stacked" 
                        size={28} 
                        color={colors["primary"]["500"]} /> }
                    Label="Consent History" />
            </View>
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 600,
    },
    bottomRadious: {
        borderBottomEndRadius: 10
    },
    body: {
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
    },
})
