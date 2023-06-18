
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen';
import ChannelListScreen from './Screens/ChannelList';
import ChannelScreen from './Screens/ChannelScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' headerMode={null}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={({route, navigation}) => ({
            headerShown: false
          })}
        />
        <Stack.Screen name="Chats" component= {ChannelListScreen} />
        <Stack.Screen 
          name="Channel Screen" 
          component={ChannelScreen} 
          options={({route, navigation}) => ({
            headerTitle: route.params.chatName!=null ? route.params.chatName: route.params.userName,
            headerBackTitleVisible: false
          })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;