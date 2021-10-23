import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme, Box, Flex } from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import NewConsentReq from '../ConsentSubScreens/newConsentReq';
import ApprovalWait from '../ConsentSubScreens/ApprrovalWait';
import ReviewAddress from '../ConsentSubScreens/ReviewAddress';
import Verdict
 from '../ConsentSubScreens/Verdict';
function showCurrentSubScreen(current, setCurrent, navigation) {

    switch(current){
        case 0:
            return <NewConsentReq 
            setCurrent={ setCurrent } />;
        case 1:
            return <ApprovalWait 
            setCurrent={ setCurrent } />;
        case 2:
            return <ReviewAddress 
            setCurrent={ setCurrent } />;
        case 3:
            //get success or fail
            return <Verdict 
            setCurrent={ setCurrent }
            navigation={ navigation }
            success={true} />;
        default:

    };
}
export default function RequestConsent({ navigation }) {
    const [current, setCurrent] = useState(0);
    const { colors } = useTheme();
    const labels = ["request anumati", "anumati status", "review details", "finish approved"];
    
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
                { showCurrentSubScreen(current, setCurrent, navigation) }
            </View>
        </View>
    );
}
