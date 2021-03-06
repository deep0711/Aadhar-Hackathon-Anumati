import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardStack from './DashboardStack';
import NotificationStack from './NotificationStack';
import MyAadhaar from './MyAadhaar';
import { StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'native-base';

export default function TabNav() {

    const Tab = createBottomTabNavigator();

    return (
      <>
      <StatusBar />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#222526',
            tabBarInactiveTintColor: '#b6b9ba',
            tabBarIcon: ({ color, size }) => {
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
            <Tab.Screen name="Notifications" component={NotificationStack} options={{ headerShown: false }} />
            <Tab.Screen name="MyAadhaar" component={MyAadhaar} options={{ headerShown: false }} />
        </Tab.Navigator>
      </>
    );
}