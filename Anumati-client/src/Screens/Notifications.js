import React,{useState,useEffect} from 'react'
import { View, Text, FlatList, TouchableOpacity,RefreshControl,SafeAreaView,StyleSheet } from 'react-native'
import { Box, Heading, ScrollView, useTheme } from 'native-base';
import { FontAwesome,AntDesign,Foundation,Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import Loader from './Loader';

const NotificationCard = ({ colors, navigation,Requester,ConsentId,created_At,Name,status }) => (
    <TouchableOpacity onPress={ ()=>{ navigation.navigate("Request",{ConsentId:ConsentId,Requester:Requester,Name:Name,Status:status})} }>
    <Box 
            alignItems="center" 
            rounded="md" 
            mb="3" 
            shadow={1} 
            borderColor="cyan.500" 
            backgroundColor="white"
            width="370"  
            flexDirection="row">
                <Box flex="1" alignItems="center">
                { status=="Approved" ? <FontAwesome name="check-circle-o" size={42} color={colors["success"]["500"]} /> :
                (status=="Rejected" ? <Foundation name="x-circle" size={42} color={colors["error"]["500"]} /> : ((status == "Reviewed" || status == "Finish")  ? <Ionicons name="checkmark-done-circle" size={42} color={colors["success"]["500"]} /> : <AntDesign name="exclamationcircle" size={42} color='#F98739' />))}
                </Box>
                <Box m="3" flex="5">
                    <Heading>
                        Consent Request By {"XXXX XXXX "+Requester.substr(8)}
                    </Heading>
                    <Text>
                        Name: {Name}
                    </Text>
                    <Text>
                        Date: {created_At.toString().substr(0,10)}
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
);

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export default function Notifications({ navigation }) {
    const { colors } = useTheme();
    const [aadharNo,setAadharNo] = useState('');
    const [dataList,setDataList] = useState([]);
    const [count,setCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    
    const getAadhar = async () =>{
        AsyncStorage.getItem('aAdharNumber').then((result)=>{
            setAadharNo(result);
        })
    }

    const getConsent = async() => {
        console.log("Aadhar is",aadharNo);
        setCount(0);
        fetch('https://anumati.herokuapp.com/anumati-server/get-consent-to-approve',{
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
            console.log("Notifications are :",response);
            if(response["message"] ==='Consent Extracted Successfully')
            {
                setDataList(response['data']);   
            }
            setCount(1);
        }).catch(err=>console.log(err));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        if(aadharNo === ''){
            getAadhar();
        }else{
            getConsent();
        }
        wait(2000).then(() => setRefreshing(false));
    }, [aadharNo]);

    useEffect(() => {
        console.log("Hellow World");
        if(aadharNo === ''){
            getAadhar();
        }else{
            getConsent();
        }    
    }, [aadharNo])
    
    if(count == 0){
        return(
            <Loader/>
        )

    }else{
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                    <Box flex={1} alignItems="center" py="3">{dataList.length == 0 ?
                        <Card 
                            borderRadius="lg">
                            <Heading m="10">
                                No Notifications
                            </Heading>
                        </Card> :
                        <FlatList 
                        data={dataList}
                        keyExtractor={ item => item.ConsentID }
                        renderItem={ ({item})=>{
                        return(
                        <NotificationCard 
                            colors={colors}
                            navigation={navigation}
                            Requester = {item.RequesterAadhar}
                            ConsentId = {item.ConsentID}
                            created_At = {item.createdAt}
                            Name = {item.RequesterName}
                            status = {item.Status}
                            />
                        )}}/>}
                    </Box>
                </ScrollView>
            </SafeAreaView>    
        )
    }    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
})    