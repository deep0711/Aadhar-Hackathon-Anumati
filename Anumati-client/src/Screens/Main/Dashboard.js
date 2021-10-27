import React from 'react'
import { View, StyleSheet, StatusBar,  TouchableOpacity } from 'react-native'
import {Box, Center, Heading, Text, Image, Button, useTheme } from 'native-base';
import Card from '../../Components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ServiceBtn from '../../Components/ServiceBtn';

const AadhaarPreview = () => (
        <Box
        rounded="lg"
        width="80"
        bg="secondary.400"
        >
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Image 
                mx="5"
                source={{
                    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }}
                alt="profile image"
                size="sm"
                borderRadius={100} />
                <View style={{ flexDirection: "column", marginHorizontal: 10 }} >
                <Heading size="md" >
                    Roshan Rai
                </Heading>
                <Text>
                    XXXXXXXXXXX
                </Text>
                </View>
            </View>
        </Box>
);

const AadhaarContainer = ({ colors }) => (
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
            <AadhaarPreview/>
            </Box>
        </Center>
    </Box>
);

export default function Dashboard({ navigation }) {
    const { colors } = useTheme();
    
    return (
        <>
        <StatusBar backgroundColor={colors['primary']['500']} />
        <View style={styles.container}>
            
            <AadhaarContainer />

            <View style={ styles.body }>
                <ServiceBtn 
                    handlePress={ ()=>{navigation.navigate('Request Consent')} }
                    Icon={ <FontAwesome 
                        name="send-o" 
                        size={28} 
                        color={colors["primary"]["500"]} /> }
                    Label="Resquest Consent" />
                <ServiceBtn 
                    handlePress={ ()=>{ navigation.navigate('History')} }
                    Icon={ <Ionicons 
                        name="file-tray-stacked" 
                        size={28} 
                        color={colors["primary"]["500"]} /> }
                    Label="Consent History" />
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
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center"
    },
    aadhaarContainer: {

    }
})
