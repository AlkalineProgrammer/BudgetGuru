import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashBoard from './src/screens/dashBoard';
import Verification from './src/screens/Verification';
import { useTypedSelector } from './src/hooks';
import { navigate, navigationRef } from './src/utils/RefNavigation';
import BudgetList from './src/screens/dashBoard/BudgetList';

const Stack = createNativeStackNavigator()

const Router = () => {
    const login = useTypedSelector((state) => state.login)
    useEffect(() => {
        if (login.isSuccess) {
            if (!login.data?.user?.emailVerified) {
                Alert.alert("Email not verified", "Please verify your email before logging in.", [{
                    onPress: async () => await login.data.user.sendEmailVerification(),
                    style: 'default',
                    text: 'Verify'
                }]);
            } else {
                navigate({ name: "DashBoard" })
            }
        }
    }, [login.isSuccess])
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={login.data?.user ? "DashBoard" : "WelcomeScreen"} screenOptions={{ headerShown: false, gestureEnabled: true }}>
                <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name='Verification' component={Verification} />
                <Stack.Screen name="DashBoard" component={DashBoard} />
                <Stack.Screen name="BudgetList" component={BudgetList} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Router

const styles = StyleSheet.create({})