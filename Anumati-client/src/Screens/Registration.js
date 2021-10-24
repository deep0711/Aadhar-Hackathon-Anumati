import React , { useState } from "react";
import { View , Image , StyleSheet, ImageBackground , Text} from "react-native";
import Logo from '../assets/Aadhar-Color.png';
import { Divider , Button , Input ,useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bg from '../assets/BG2.jpg';

function RegistrationScreen( props ) {

    const [aadharNo , setAadharNo] = useState('');
    const [isLoading , setIsLoading] = useState(false);

    const toast = useToast();

    const handleSubmit = async() => {
        setIsLoading(true);
            if (aadharNo.length === 12) {
                try {
                    await AsyncStorage.setItem('aAdharNumber', aadharNo);
                } catch(e) {
                    console.log(e);
                }
                props.navigation.navigate('CreatePIN');
            } else {
                console.log('Aadhar Number is 12 Digit Long!');
                setIsLoading(false);

                toast.show({
                    title: "Wrong Input",
                    status: "error",
                    description: "Aadhar Number is 12 Digit Long!  ",
                    duration: 5000,
                    variant: "outline-light"
                });
            }
    }

    return(
        <ImageBackground
            source={Bg}
            resizeMode="cover"
            style={{flex: 1}}
            blurRadius={1} 
        >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo}/>
                </View>
                <View style={{ marginLeft: 20 , marginRight: 20 }}>
                    <Divider orientation="horizontal" mx="auto" bg="coolGray.400" thickness="1"/>
                </View>
                <Text style={{fontSize: 25 , textAlign: 'center' , marginTop: 10}}> ANUMATI </Text>
                <Text style={{fontSize: 13 , textAlign: 'center'}}> Address Update Made Easy </Text>
                <View style={styles.formContainer}>
                    <Input 
                        variant="filled" 
                        placeholder="Enter 12 Digit Aadhar Number"
                        keyboardType="number-pad"
                        onChangeText={text => setAadharNo(text)}
                    />
                    <Button 
                        isLoading={isLoading} 
                        isLoadingText="Submitting" 
                        style={{marginTop: 15 , marginLeft: 15 , marginRight: 15}}
                        onPress={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                </View>
            </View>
        </ImageBackground>
    )
}

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 3, 
        marginRight:20,
        marginLeft:20,
        padding: 20,
    },
    logo : {
        width: 190,
        height: 120,
        alignSelf:'center',
    }
})