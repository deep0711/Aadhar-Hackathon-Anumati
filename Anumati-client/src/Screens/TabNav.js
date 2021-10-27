import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardStack from './DashboardStack';
import Notifications from './Notifications';
import MyAadhaar from './MyAadhaar';
import { StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TabNav() {

    const Tab = createBottomTabNavigator();

    return (
      <>
      <StatusBar />
        <Tab.Navigator
          screenOptions={({route})=>({
            tabBarActiveTintColor: '#222526',
            tabBarInactiveTintColor: '#b6b9ba',
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch(route.name){
                  case "Consent":
                    iconName = "dashboard";
                    break;
                  case 'Notifications':
                    iconName = "approval";
                    break;
                  case "MyAadhaar":
                    iconName = "id-card";
                    return <FontAwesome name="id-card" size={size} color={color} />;
                }; 
                    
                
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            headerStyle: {
              backgroundColor: "#34a4eb"
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white"
            }
          })}>
            <Tab.Screen name="Consent" component={DashboardStack} options={{ headerShown: false }} />
            <Tab.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            <Tab.Screen name="MyAadhaar" component={MyAadhaar} options={{ headerShown: false }} />
        </Tab.Navigator>
      </>
    );
}