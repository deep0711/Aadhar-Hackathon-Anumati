import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DashboardStack from './DashboardStack';
import Notifications from './Notifications';
import { StatusBar } from 'react-native';

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
                if (route.name === "DashboardStack") {
                    iconName = "dashboard";
                } else if (route.name === 'Notifications') {
                    iconName = "approval";
                }    
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
            <Tab.Screen name="DashboardStack" component={DashboardStack} options={{ headerShown: false }} />
            <Tab.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        </Tab.Navigator>
      </>
    );
}