import {View, Text} from "react-native";
import {useState, useEffect} from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeSummary = async (chat, value) => {
	try {
	  console.log(chat + ": "+ value);
	  await AsyncStorage.setItem(chat, value)
	} catch (e) {
	  // saving error
	  console.log(e);
	}
}
const getSummary = async (key) => {
	try {
	  const value = await AsyncStorage.getItem(key)
	  if(value !== null) {
		// value previously stored
		console.log("Found the value: "+ value);
		return value;
	  }
	} catch(e) {
	  // error reading value
	  console.log(e);
	}
}

function ChannelScreen({route, navigation}) {
	console.log(route.params.userName);
	const [summary, setSummary] = useState('');
	useEffect(() => {
		const fetch = async() => {
			const summaryStored = await getSummary(route.params.userName);
			console.log(summaryStored);
			if (summaryStored!=null) {
				setSummary(summaryStored);
			}
			else {
				axios.get(`https://b59a-135-180-118-61.ngrok-free.app/get_chat_summary?username=${route.params.userName}`).then((response) => {
					setSummary(response.data);
					storeSummary(route.params.userName, response.data);
				})
			}
		}
		fetch();
		
	}, []);
	return (
		<View>
			<View style={{height: 50, width: "100%", backgroundColor:"#eee"}}></View>
			<Text>
				{summary}
			</Text>
		</View>
	)
}

export default ChannelScreen;