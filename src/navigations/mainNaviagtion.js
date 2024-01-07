

import React , {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormScreen from '../screens/FormScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import { getItem } from '../Storage/localStorage';
import { setEmail, setName } from '../Redux/formReducer';
import { ActivityIndicator, View } from 'react-native';
import { PROPERTIES } from '../constants';
import AddPostScreen from '../screens/AddPostScreen';
const Stack = createStackNavigator();

const FormStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: '#fff', // Set your desired text color here
        },
        // headerTintColor: 'blue', // Set your desired back button and title text color here
      }}
    >
      <Stack.Screen 
        name="FormScreen" 
        component={FormScreen} 
        options={{ title: 'Form', headerStyle: {
            backgroundColor: PROPERTIES.PRIMARY_COLOR
        }}} 
      />
    </Stack.Navigator>          
  )
}

const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            color: '#fff', // Set your desired text color here
          },
          // headerTintColor: 'blue', // Set your desired back button and title text color here
        }}
      >
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Home', headerStyle: {
              backgroundColor: PROPERTIES.PRIMARY_COLOR
          }}} 
        />
        <Stack.Screen 
          name="AddPostScreen" 
          component={AddPostScreen} 
          options={{ title: 'Add Post', headerStyle: {
              backgroundColor: PROPERTIES.PRIMARY_COLOR
          }}} 
        />
      </Stack.Navigator>          
    )
  }

const MainNavigation = () => {
    const {email, name}  = useSelector(state => state.formData);
    const [ loader, setLoader ] = React.useState(true);
    const dispatch = useDispatch();

    React.useEffect(() => {
        getItem('@name')
        .then(res => {
            dispatch( setName(res?.data) )
            getItem('@email')
            .then(res2 => {
                dispatch( setEmail(res2?.data) )
                setLoader(false)
            }).catch(e => {
                setLoader(false)
                console.log("Error2: ", e)
            })
        }).catch(e => {
            setLoader(false)
            console.log("Error: ", e)
        })
    }, [])

    
    return (
      <View style={{ flex: 1 }}>
        {
          loader? <View style={{ 
              flex: 1,
              justifyContent: 'center',
              alignItems: "center",
          }}>
              <ActivityIndicator color={'#000'} size={'large'}/>
          </View>:
          email &&  name ? <HomeStack/>: <FormStack/>

        }
      </View>
    )
}

export default MainNavigation;