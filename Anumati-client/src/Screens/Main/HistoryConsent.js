import React from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import { Box, Heading } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

const ConsentLog = ({ colors, data }) => (
    <Card width="370" mt="3" py="3" px="3">
        <Box
        height="20"
        flexDirection="row" >
            { data.accepted ? <FontAwesome name="check-circle-o" size={42} color={colors["success"]["500"]} /> :
                <Foundation name="x-circle" size={42} color={colors["error"]["500"]} /> }
            <Box 
            mx="5"
            height="full"
            flexDirection="column" >
                <Heading size="md">Consent To {data.owner}</Heading>
                <Text>date: {data.date}</Text>
            </Box>
        </Box>
    </Card>
);


const HistoryList = ({ colors, dataList, navigation }) => {

    return <Box flex={1} alignItems="center" width="full" >
        <FlatList 
        data={dataList}
        keyExtractor={ item=>item.id.toString() }
        renderItem={ ({item})=>(
            <TouchableOpacity onPress={()=>{navigation.navigate("Consent Logs")}}>
                    <ConsentLog colors={colors} data={item} />
                </TouchableOpacity>
        ) } />
    </Box>
}

export default function HistoryConsent({ navigation }) {
    const history = [1];
    const dataList = [{
        id: 1,
        owner: "Deepak Pandya",
        date: "20/5/2020",
        accepted: true
    } , {
        id: 2,
        owner: "Kunal Khanra",
        date: "19/3/2020",
        accepted: false
    }, {
        id: 3,
        owner: "Roshan Rai",
        date: "19/4/2020",
        accepted: true
    }];

    console.log(history.length);
    const { colors } = useTheme();

    return (
        <Box 
        flex="1" 
        justifyContent="center"
        alignItems="center" >
            {
                history.length==0 ? 
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
    );
}