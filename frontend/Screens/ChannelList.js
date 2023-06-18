import { View, Text, Pressable} from "react-native";
import { useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
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

function ChannelListScreen({route, navigation}) {
	const [chatArr, setChatArr] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [displayArr, setDisplayArr] = useState([]);
	const [selectedChannel, setSelectedChannel] = useState(-1);
	useEffect(() => {
		axios.get(`https://3cd6-135-180-118-61.ngrok-free.app/get_users`).then((response) => {
			console.log(response.data);
			setDisplayArr(response.data);
			setChatArr(response.data);
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
				borderWidth: 1, 
				borderRadius: 5, 
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
								navigation.navigate('Channel Screen', {userName: chat.userName});
							}}
							style={
							{
								padding: 10, 
								height: 70, 
								borderWidth: selectedChannel==key ? 3: 0.3, 
								borderColor: selectedChannel==key ? "#44c": "black"
							}}>
							<Text style={{marginTop: "auto", marginBottom: "auto"}}>{chat.chatName!=null ? chat.chatName: chat.userName}</Text>
						</Pressable>
					})
				}
			</ScrollView>
		</View>
		
	);
}

export default ChannelListScreen;