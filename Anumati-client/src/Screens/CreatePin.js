import React from "react";
import { View , StyleSheet } from "react-native";
import PinView from '../Components/PinView';
import { connect } from 'react-redux';
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CreatePin( props ) {

    return(
        <View style={ styles.createpinConatiner }>
            <View style={ styles.formContainer }>
                <PinView loginStatus={props.loginStatus} />
            </View>
            <Button onPress={async() => {
                try {
                    await AsyncStorage.removeItem('userToken');
                    await AsyncStorage.removeItem('aAdharNumber');
                    await AsyncStorage.removeItem('mPin');
                } catch(err) {
                    console.log(err);
                }
            }}>
                Logout
            </Button>
        </View>
    )
}
const mapStateToProps = (state) => {
    
    return {
        loginStatus: state.LocalStorageReducer.tokenFound,
    }
}
export default connect(mapStateToProps)(CreatePin);
const styles = StyleSheet.create({
    createpinConatiner: {
        flex: 1,
        flexDirection: 'column',
    },
    formContainer: {
        flex: 3, 
        marginRight:20,
        marginLeft:20,
        padding: 20,
        alignItems: 'center'
    },
})