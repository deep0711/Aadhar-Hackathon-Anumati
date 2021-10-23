import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import {Box, Center, Heading, Text, Image, Button, useTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

const AadharPreview = () => (
        <Box
        rounded="lg"
        bg="secondary.400"
        >
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Image 
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

export default function Dashboard({ navigation }) {
    const { colors } = useTheme();
    return (
        <>
        <StatusBar backgroundColor={colors['primary']['500']} />
        <View style={styles.container}>
            <Box
            borderBottomRadius="10"
            bg="primary.500">
                <Center mt="5" mb="10">
                    <Text color="white">
                        updating address made easy
                    </Text>
                    <Heading m="3" color="white">
                        ANUMATI
                    </Heading>
                    <AadharPreview/>
                </Center>
            </Box> 
            <View style={ styles.body }>
                <Button 
                colorScheme="primary" 
                onPress={()=>{ navigation.navigate('Request Consent') }}>
                    <Heading size="md" color="white">
                        Request Consent
                    </Heading>  
                </Button>
                <Button 
                onPress={ ()=>{ navigation.navigate('History'); } }
                colorScheme="light" mt="5">
                    <Heading size="sm" color="white">
                        Consent History
                    </Heading>  
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
