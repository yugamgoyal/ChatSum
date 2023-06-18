
import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

import LoginScreen from './Screens/LoginScreen';
import ChannelListScreen from './Screens/ChannelList';
import ChannelScreen from './Screens/ChannelScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("telegram");
  const [items, setItems] = useState([
    {label: 'Telegram', value: 'telegram'}
  ]);
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
        <Stack.Screen name="Chats" 
          component= {ChannelListScreen} 
          options={() => ({
            headerStyle: {backgroundColor: "#f56919"},
            headerRight: () => 
            <View style={{marginLeft:"auto", marginRight: -15, minHeight: 500, zIndex: 100}}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{width: 120, borderWidth: 0, backgroundColor: "transparent", fontSize: 16}}
                
              />
            </View>
              
          })}
        />
        <Stack.Screen 
          name="Channel Screen" 
          component={ChannelScreen} 
          options={({route, navigation}) => ({
            headerShown: false
          })}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;