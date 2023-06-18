import { View, Text, Pressable} from "react-native";
import { useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
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

function ChannelListScreen({route, navigation}) {
	const [chatArr, setChatArr] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [displayArr, setDisplayArr] = useState([]);
	const [colors, setColors] = useState({});
	const [selectedChannel, setSelectedChannel] = useState(-1);
	useEffect(() => {
		
		axios.get(`https://b59a-135-180-118-61.ngrok-free.app/get_users`).then((response) => {
			console.log(response.data);
			setDisplayArr(response.data);
			setChatArr(response.data);
			let colorsJSON = {};
			for (let i=0; i<response.data.length; i++) {
				colorsJSON[response.data[i].userName] = randomColor();
			}
			setColors(colorsJSON);
		})
	}, []);
	
	return (
		<View>
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
								navigation.navigate('Channel Screen', {userName: chat.userName, chatName: chat.chatName, color: colors[chat.userName]});
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
								<Text style={{marginTop: 3, marginLeft: 10, color: "#888"}}>{Math.round(Math.random()*100)} new messages</Text>
							</View>
							
						</Pressable>
					})
				}
			</ScrollView>
		</View>
		
	);
}

export default ChannelListScreen;