
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChannelListScreen from './Screens/ChannelList';
import ChannelScreen from './Screens/ChannelScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Channel List'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Channel List" component= {ChannelListScreen} />
        <Stack.Screen name="Channel Screen" component={ChannelScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;