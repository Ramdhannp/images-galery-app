import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootState, store } from '../Redux/store'
import Login from './(tabs)/Login '
import Gallery from './(tabs)/Gallery'
import Bookmark from './(tabs)/Bookmark'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLogout } from '../Redux/slices/authSlice'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabs = () => (
  <Tab.Navigator >
    <Tab.Screen name="Home" component={Gallery} options={{tabBarHideOnKeyboard:true, headerShown: false, tabBarIcon: ({color}) => <Ionicons name='home-outline' size={24} color={color} />
    }} />
    <Tab.Screen name="Bookmark" component={Bookmark} options={{headerShown: false, tabBarIcon: ({color}) => <Ionicons name='bookmark-outline' size={24} color={color} />
    }} />
  </Tab.Navigator>
);

const AppNavigator  = () => {
  const token = useSelector((state: RootState) => state.authApi.token);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    AsyncStorage.removeItem('token')
  };
  return (

      <NavigationContainer independent={true}>
        <Stack.Navigator>
        {token ? (<>
          <Stack.Screen name="Gallery" component={MainTabs} options={{animation: "flip", headerRight: () => ( <TouchableOpacity onPress={() => handleLogout()}>
      <Ionicons name='log-out-sharp' size={24} color={'background-color: rgb(100 116 139)'}/>
      </TouchableOpacity>)}}/>
        
        </>) : (<>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        </>)}
        </Stack.Navigator>

      </NavigationContainer>
  )
};

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}