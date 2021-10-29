import React from 'react'
import { View , StyleSheet , ActivityIndicator} from "react-native";


export default function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="black" style={{marginTop: 100}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center'
    }
})
