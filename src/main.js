

import React , {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {SafeAreaView , StyleSheet , StatusBar  } from 'react-native';
import store from './Redux/store';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigation from './navigations/mainNaviagtion';
const Stack = createStackNavigator();

const Main = () => {
    useEffect(() => {
      SplashScreen.hide();
    },[]);


    return (

        <SafeAreaView style={styles.container}>
          <Provider store={store}>
            <NavigationContainer>
              <MainNavigation/>
            </NavigationContainer>
          </Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  });
  

export default Main;