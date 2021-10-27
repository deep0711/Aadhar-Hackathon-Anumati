import React , { useState } from "react";
import { Text, View , StyleSheet , StatusBar , ImageBackground, Image} from "react-native";
import Bg from '../assets/BG2.jpg'
import Carousel , { Pagination } from 'react-native-snap-carousel';
import { Button } from "native-base";

import DBack from '../assets/DBack.png';
import ABack from '../assets/ABack.png';
import SBack from '../assets/SBack.png';


const Tutorial = ( props ) => {
    const [activeIndex , setActiveIndex] = useState(0);
    const pagination = () => {
        return(
            <Pagination
                dotsLength={3}
                activeDotIndex={activeIndex}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    marginHorizontal: 8,
                    backgroundColor: 'black'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }
    const onSubmitButton = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Consent'}]
        });
    }
    const Slide1 = () => {
        return(
            <View style={styles.container}>
                <Image source={DBack} style={styles.backGroundImage}/>
                <Text style={styles.tagLine}> Interactive and Beautiful Dashboard for All Your Work at One Place </Text>
                <View style={{ flexDirection: 'column-reverse' , flex: 1}}>
                    <Button variant="outline" onPress={() => onSubmitButton()} > Skip </Button>
                </View>
            </View>
        )
    }
    const Slide2 = () => {
        return(
            <View style={styles.container}>
                <Image source={ABack} style={styles.backGroundImage}/>
                <Text style={styles.tagLine}> Easy and Secure change / Update of Aadhar Card Address  </Text>
                <View style={{ flexDirection: 'column-reverse' , flex: 1}}>
                    <Button variant="outline" onPress={() => onSubmitButton()} > Skip </Button>
                </View>
            </View>
        )
    }
    const Slide3 = () => {
        return(
            <View style={styles.container}>
                <Image source={SBack} style={styles.backGroundImage}/>
                <Text style={styles.tagLine}> Highly Secure and Very Easy to Use </Text>
                <View style={{ flexDirection: 'column-reverse' , flex: 1}}>
                    <Button variant="outline" onPress={() => onSubmitButton()}> Done </Button>
                </View>
            </View>
        )
    }

    const data = [
        {
            Slide: <Slide1/>
        },
        {
            Slide: <Slide2 />
        },
        {
            Slide: <Slide3 />
        }
    ]

    const _renderItem = ({ item , index}) => {
        return(
            <View key={index} style = {{ justifyContent: 'center' , flex: 1}}>
                {item.Slide}
            </View>
        )
    }
    return(
        <ImageBackground 
            source={Bg}
            resizeMode="cover"
            style={{flex: 1}}
            blurRadius={1}  
        >
            <StatusBar />
            <View style={{ justifyContent: 'center' , alignItems: 'center' , flex: 1}}>
                <Carousel 
                    layout={"default"}  
                    data={data}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={_renderItem}
                    style={{justifyContent: 'center'}}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
                { pagination() }
            </View>
        </ImageBackground>
    )
}
export default Tutorial;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        width: 350,
        alignSelf: 'center',
        height: 600,
        marginTop : 20, 
        marginBottom: 20
    },
    backGroundImage: {
        marginTop: 40,
        width: 350,
        height: 400,
        alignSelf: 'center'
    },
    tagLine: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15
    },
});