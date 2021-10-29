import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme, Box, Flex } from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import NewConsentReq from '../ConsentSubScreens/newConsentReq';
import ApprovalWait from '../ConsentSubScreens/ApprrovalWait';
import ReviewAddress from '../ConsentSubScreens/ReviewAddress';
import Verdict
 from '../ConsentSubScreens/Verdict';
function showCurrentSubScreen(current, setCurrent, navigation,ConsentId,House,setHouse) {

    switch(current){
        case 0:
            return <NewConsentReq 
            setCurrent={ setCurrent } />;
        case 1:
            return <ApprovalWait 
            setCurrent={ setCurrent } />;
        case 2:
            return <ReviewAddress 
            setCurrent={ setCurrent } 
            ConsentID = {ConsentId}
            setHouse = {setHouse}
            House = {House}
             />;
        case 3:
            //get success or fail
            return <Verdict 
            setCurrent={ setCurrent }
            navigation={ navigation }
            ConsentID = {ConsentId}
            success={true}
            House = {House}
            />;
        default:

    };
}
export default function RequestConsent({ navigation,route }) {
    const [current, setCurrent] = useState(typeof route.params == 'undefined' ? 0:route.params.Screen);
    const { colors } = useTheme();
    const [consentId,SetConsentId] = useState(typeof route.params == 'undefined' ? "":route.params.ConsentId);
    const [ConsentPresent,setPresent] = useState(typeof route.params == 'undefined' ? false :true);
    const labels = ["Request Anumati", "Anumati Status", "Review Details", "Finish Approved"];
    const [House,setHouse] = useState("");
    
    //if(ConsentPresent)
    //    setCurrent(2);

    const indicatorStyle = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: colors['primary']['500'],
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: colors['primary']['500'],
        stepStrokeUnFinishedColor: '#dedede',
        separatorFinishedColor: colors['primary']['500'],
        separatorUnFinishedColor: '#dedede',
        stepIndicatorFinishedColor: colors['primary']['500'],
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: 'transparent',
        stepIndicatorLabelFinishedColor: 'transparent',
        stepIndicatorLabelUnFinishedColor: 'transparent',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: colors['primary']['500'],
      };
    
    return (
        <View style={{
            flex: 1
            }}>
            <Box m="5">
                <StepIndicator
                labels={labels}
                stepCount={labels.length}
                customStyles={indicatorStyle}
                currentPosition={current}
                />
            </Box>
            <View style={{
                flex: 1, 
                }}>
                { showCurrentSubScreen(current, setCurrent, navigation,consentId,House,setHouse) }
            </View>
        </View>
    );
}
