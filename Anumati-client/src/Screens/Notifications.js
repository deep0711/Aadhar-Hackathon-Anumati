import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Box, Heading, useTheme } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const NotificationCard = ({ colors, navigation }) => (
    <TouchableOpacity onPress={ ()=>{ console.log("hi"); navigation.navigate("Request")} }>
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
                    <FontAwesome name="exclamation" size={28} color={ colors["secondary"]["500"] } />
                </Box>
                <Box m="3" flex="5">
                    <Heading>
                        Consnet Request By :
                    </Heading>
                    <Heading>
                        Roshan Rai
                    </Heading>
                    <Text>
                        Date: dd/mm/yyyy
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
);

export default function Notifications({ navigation }) {
    const { colors } = useTheme();
    const DummyData = [1,2,3,4,5,6,7,8,9,10];

    return (
        <Box  flex={1} alignItems="center" py="3">
            <FlatList 
            data={DummyData}
            keyExtractor={ item => item.toString() }
            renderItem={ ()=>(<NotificationCard 
                colors={colors}
                navigation={navigation} />) }
            />
        </Box>
    )
}
