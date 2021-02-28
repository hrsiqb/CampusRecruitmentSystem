
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
import Dashboard from '../Screens/Dashboard';
import Menu from '../Screens/Menu';
import UserDetails from '../Screens/UserDetails';
import JobDetails from '../Screens/JobDetails';
import ms from '../styles'

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}  options={{
          headerStyle: [ms.bc_blu], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: "Login"
        }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{
          headerStyle: [ms.bc_blu], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: "Dashboard"
        }} />
        <Stack.Screen name="Menu" component={Menu} options={{
          headerStyle: [ms.bc_blu], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: "Menu"
        }} />
        <Stack.Screen name="User Details" component={UserDetails} options={({ route }) => ({
          headerStyle: [ms.bc_blu], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: route.params.userInfo.FullName
        })} />
        <Stack.Screen name="Job Details" component={JobDetails} options={({ route }) => ({
          headerStyle: [ms.bc_blu], headerTitleStyle: [ms.as_c, ms.ff_s,
          ms.fw_b, ms.fs_25], headerLeft: null, headerTintColor: "#fff", title: route.params.vacancy.CompanyName
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation