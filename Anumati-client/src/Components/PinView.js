import {Animated, Image, SafeAreaView, Text } from 'react-native';
import React, {useState} from 'react';
import Logo from '../assets/Aadhar-Color.png';

import { Button , CheckIcon , ChevronRightIcon,useToast} from 'native-base';
import { connect } from 'react-redux';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const AnimatedExample = ( props ) => {
    const toast = useToast();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    const renderCell = ({index, symbol, isFocused}) => {
      const hasValue = Boolean(symbol);
      const animatedCellStyle = props.loginStatus ? {
        backgroundColor: hasValue
          ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
        }),
        borderRadius: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
        }),
        transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    }: {
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
    };
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };


  return (
    <SafeAreaView style={styles.root}>
        <Text style={styles.title}> {props.loginStatus ? "Lock Screen" : "Set Up Your Secure Pin"} </Text> 
        <Image style={styles.icon} source={Logo} />
        <Text style={styles.subTitle}> { props.loginStatus ? "Enter Your Secure Pin" : "Pin will be used to Further Login's"} </Text> 

        <CodeField
          ref={ref}
          {...propsCode}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        {
            props.loginStatus ?
            <Button
              size="sm"
              variant="subtle"
              colorScheme="primary"
              style={styles.nextButton}
              rightIcon = { <ChevronRightIcon size="7" mt="0.5" color="emerald.500" style={{ justifyContent: 'center'}}/> }
              onPress={() => {
                if(value === props.storedMPin) {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabNav'}]
                  });
                } else {
                  toast.show({
                    title: "Wrong PIN",
                    status: "error",
                    duration: 3000,
                    variant: "outline-light"
                });
                }
              }}
            > 
              UNLOCK SCREEN
            </Button>
            :
            <Button
              size="sm"
              variant="subtle"
              colorScheme="primary"
              style={styles.nextButton}
              leftIcon = { <CheckIcon size="5" mt="0.5" color="emerald.500" /> }
              onPress={() => {
                props.onCreatePin(value);
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'TabNav'}]
                });
              }}
            > 
              CREATE PIN
            </Button>
        }
    </SafeAreaView>
  );
};


const mapStatetoProps = ( state ) => {
  return {
    storedMPin: state.userReducer.mPin,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    onCreatePin: async (pinCode) => { 
      await AsyncStorage.setItem('mPin' , pinCode);
      await AsyncStorage.setItem('userToken' , '#f7j38df');
      dispatch({ type: 'CREATE_PIN' , pin: pinCode});
    }
  }
}

export default connect(mapStatetoProps , mapDispatchToProps)(AnimatedExample);
