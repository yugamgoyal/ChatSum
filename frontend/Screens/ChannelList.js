import { View, Text, Pressable} from "react-native";
import { useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function filter(arr, str) {
	return arr.filter((element) => {
		let text = "";
		if (element.chatName!=null) text = element.chatName;
		else text = element.userName;
		if (text.toLowerCase().includes(str.toLowerCase())) return true;
		return false;
	})
}
function randomColor() {
	const colors = ["#FF5733", "#2E86C1", "#A93226", "#D4AC0D", "#229954", "#1C2833", "#6C3483"];
	const index = Math.floor(Math.random()*colors.length);
	return colors[index];
}

const storeChannels = async (value) => {
	try {
	  await AsyncStorage.setItem("channels", JSON.stringify(value))
	} catch (e) {
	  // saving error
	  console.log(e);
	}
}
const getChannels = async () => {
	try {
	  const value = await AsyncStorage.getItem("channels")
	  if(value !== null) {
		// value previously stored
		console.log("Found the value: "+ value);
		return JSON.parse(value);
	  }
	} catch(e) {
	  // error reading value
	  console.log(e);
	}
}

function ChannelListScreen({route, navigation}) {
	const [chatArr, setChatArr] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [displayArr, setDisplayArr] = useState([]);
	const [colors, setColors] = useState({});
	const [selectedChannel, setSelectedChannel] = useState(-1);
	useEffect(async () => {
		const storedChannels = await getChannels();
		if (storedChannels!=null) {
			setChatArr(storedChannels);
			setDisplayArr(storedChannels);
		}
		axios.get(`https://8ee6-2600-1010-a002-bb4e-1572-156-8022-eaf1.ngrok-free.app/get_users`).then((response) => {
			console.log(response.data);
			setDisplayArr(response.data);
			setChatArr(response.data);
			storeChannels(response.data);
			let colorsJSON = {};
			for (let i=0; i<response.data.length; i++) {
				colorsJSON[response.data[i].userName] = randomColor();
			}
			setColors(colorsJSON);
		})
	}, []);
	
	return (
		<View style={{zIndex:-1}}>
			<TextInput 
			placeholder="Search Chats"
			value={searchTerm}
			onChangeText={(newText) => {
				setSearchTerm(newText);
				setDisplayArr(filter(chatArr, newText));
			}}
			style={{
				height: 50, 
				// borderWidth: 1, 
				borderRadius: 10, 
				backgroundColor: "#ddd",
				width: "100%",
				alignSelf: "center",
				padding: 10
			}}
			></TextInput>
			<ScrollView style={{height: "94%"}}>
				{
					displayArr.map((chat, key) => {
						console.log(chat);
						return <Pressable
							onPress={()=>{
								setSelectedChannel(key);
								navigation.navigate(
									'Channel Screen', 
									{userName: chat.userName, 
									chatName: chat.chatName, 
									color: colors[chat.userName],
									unreadMessages: chat.unreadMessages,
									totalMessages: chat.totalMessages,
									attachments: chat.attachment
								});
							}}
							style={
							{
								padding: 10, 
								height: 90, 
								borderWidth: selectedChannel==key ? 1: 0.25, 
								borderColor: selectedChannel==key ? "#44c": "#ddd",
								flexDirection: "row"
							}}>
							
							{chat.chatName!=null ? <Ionicons name="people-circle" size={72} color={colors[chat.userName]} />: <Ionicons name="person-circle" size={72} color={colors[chat.userName]} />}
							<View>
								<Text style={{marginTop: 10, marginBottom: 5, marginLeft: 10, fontWeight: "bold", fontSize: 17}}>{chat.chatName!=null ? chat.chatName: chat.userName}</Text>
								<Text style={{marginTop: 3, marginLeft: 10, color: "#888"}}>{chat.unreadMessages} new messages</Text>
							</View>
							
						</Pressable>
					})
				}
			</ScrollView>
		</View>
		
	);
}

export default ChannelListScreen;