import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackCategNavigation from './stackCategScreen';
import DashboardStackNav from './DashboardStackNav';

export default function TabNav() {

    const Tab = createBottomTabNavigator();

    return (
      <PaperProvider>
        <Tab.Navigator
        screenOptions={({route})=>({
            //headerShown: true,
            tabBarActiveTintColor: '#222526',
            tabBarInactiveTintColor: '#b6b9ba',
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Questions") {
                    iconName = "dashboard";
                } else if (route.name === 'Channels') {
                    iconName="message";
                } else if (route.name === 'Live Dashboard') {
                    iconName="compass-calibration";
                }
                else { // for profile
                    iconName = "admin-panel-settings";
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
            <Tab.Screen name="Questions" component={DashboardStackNav} options={{ headerShown: false }} />
            <Tab.Screen name="Channels" component={StackCategNavigation} options={{ headerShown: false }} />
            <Tab.Screen name="Live Dashboard" component={GoalScreen} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </PaperProvider>
    );
}