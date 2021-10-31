import React, { useEffect } from "react";
import { View , StyleSheet } from "react-native";
import PinView from '../Components/PinView';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

function CreatePin( props ) {

    useEffect(() => {
        const getPinfromDB = async() => {            
            if(!props.loginStatus)
            {
                const aadharNo = await AsyncStorage.getItem('aAdharNumber');
                //Check wether this user has previously registered or not;
                fetch('https://anumati.herokuapp.com/anumati-server/get-pin',{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',  // It can be used to overcome cors errors
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "aadhar":aadharNo
                    })
                })
                .then(async function(response){    
                    response = await response.json();
                    if(response["message"] === "PIN received successfully")
                    {
                        props.storeUserToken(response["pin"]);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'CreatePIN'}]
                        });
                    }    
                })
                .catch(err => console.log(err));
            }
        }
        getPinfromDB();        
    }, []);

    return(
        <View style={ styles.createpinConatiner }>
            <View style={ styles.formContainer }>
                <PinView loginStatus={props.loginStatus} navigation = {props.navigation}/>
            </View>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        loginStatus: state.LocalStorageReducer.tokenFound,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        storeUserToken : async(pinCode) =>{
            try{
                await AsyncStorage.setItem('mPin' , pinCode);
                await AsyncStorage.setItem('userToken' , '#f7j38df');
                dispatch({ type: 'CREATE_PIN' , pin: pinCode});
            } catch(err) {
                console.log(err);
            }
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreatePin);
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