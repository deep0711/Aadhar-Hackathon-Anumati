import React, { useState,useEffect } from 'react';
import { Text, TouchableOpacity, FlatList,RefreshControl,SafeAreaView,StyleSheet } from 'react-native';
import { Box, Heading,ScrollView,HStack } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation,AntDesign,Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';

const ConsentLog = ({ colors, data }) => {
    return(
    <Card width="370" mt="3" py="3" px="3">
        <Box
        height="20"
        flexDirection="row" >
            { data.Status=="Approved" ? <FontAwesome name="check-circle-o" size={42} color={colors["success"]["500"]} /> :
                (data.Status=="Rejected" ? <Foundation name="x-circle" size={42} color={colors["error"]["500"]} /> : ((data.Status == "Reviewed" || data.Status == "Finish")  ? <Ionicons name="checkmark-done-circle" size={42} color={colors["success"]["500"]} /> : <AntDesign name="exclamationcircle" size={42} color='#F98739' />) )}
            <Box 
            mx="5"
            height="full"
            flexDirection="column" >
                <Heading size="md">Consent to {"+91" + data.ApproverAadhar}</Heading>
                <Text>Date: {data.createdAt.toString().substr(0,10)}</Text>
                <Text>Status: {data.Status}</Text>
            </Box>
        </Box>
    </Card>
    )};


const HistoryList = ({ colors, dataList, navigation }) => {
    return <Box flex={1} alignItems="center" width="full" >
        <FlatList 
        data={dataList}
        keyExtractor={ item=>item.ConsentID}
        renderItem={ ({item})=>{
            return(
            <TouchableOpacity onPress={()=>{ item.Status=="Approved" ? (navigation.navigate("Request-Consent",{ConsentId:item.ConsentID,Screen:2})):(navigation.navigate("Consent Logs",{ConsentId:item.ConsentID}))}}>
                    <ConsentLog colors={colors} data={item} />
            </TouchableOpacity>)
         } } />
    </Box>
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function HistoryConsent({ navigation }) {
    
    const [aadharNo,setAadharNo] = useState('');
    const [dataList,setDataList] = useState();
    const [count,setCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    
    
    const getAadhar = async() => {
        AsyncStorage.getItem('aAdharNumber').then((result) => {
            setAadharNo(result);
        });
    }
    const getDetails = async () => {
        try{
                setCount(0);
                console.log("Aadhar is",aadharNo);
                fetch('https://anumati.herokuapp.com/anumati-server/get-consent-detail',{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',  // It can be used to overcome cors errors
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "aadhar":aadharNo,
                    })
                }).then(async function(response){
                    response = await response.json();
                    console.log(response);
                    if(response["message"] ==='Consent Extracted Successfully')
                    {
                        setDataList(response['data']);
                        var cnt = 0;
                        response['data'].map(item=>{
                            if(item.Status == "Pending" || item.Status == "Approved")
                            cnt=1;
                        })

                        if(cnt == 0)
                        {
                            console.log("New Consent is Allowed");
                            await AsyncStorage.setItem('RequestInProgress','false');
                        }
                        setCount(1);   
                    }
                    }).catch(err=>console.log(err));
            }catch(err){
                console.log("Error is ",err);
            }
    }
    useEffect(() => {
        if(aadharNo === ''){
            getAadhar();
        }else{
            getDetails();
        }
    }, [aadharNo])
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        if(aadharNo === ''){
            getAadhar();
        }else{
            getDetails();
        }
        wait(2000).then(() => setRefreshing(false));
    }, [aadharNo]);

    const { colors } = useTheme();

    if(count == 0)
        return (
            <Loader/>
        )
    else if(count == 1){      
    return (
        <SafeAreaView style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <Box 
                flex="1" 
                justifyContent="center"
                alignItems="center" >
                    {
                        dataList.length==0 ? 
                        <Card 
                        borderRadius="lg">
                        <Heading m="10">
                            No Consent
                        </Heading>
                        </Card> :
                        <HistoryList 
                        navigation={navigation}
                        colors={colors} 
                        dataList={ dataList } />
                    }
                </Box>
                </ScrollView>
                <HStack bg="indigo.400" borderRadius={10} alignSelf='center' safeAreaBottom shadow={6}><Text style={{fontSize:15}}>Drag down to refresh!</Text></HStack>
            </SafeAreaView>    
    );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
})    