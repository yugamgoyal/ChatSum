import { View, Text, Pressable} from "react-native";
import { useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";

function filter(arr, str) {
	return arr.filter((element) => {
		if (element.includes(str)) return true;
	})
}

function ChannelListScreen({route, navigation}) {
	const chatsArr = Array(20).fill("Chat Name");
	const [searchTerm, setSearchTerm] = useState('');
	const [displayArr, setDisplayArr] = useState(chatsArr);
	const [selectedChannel, setSelectedChannel] = useState(-1);
	return (
		<View>
			<TextInput 
			placeholder="Search Chats"
			value={searchTerm}
			onChangeText={(newText) => {
				setSearchTerm(newText);
				setDisplayArr(filter(chatsArr, newText));
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
						return <Pressable
							onPress={()=>setSelectedChannel(key)}
							style={
							{
								padding: 10, 
								height: 70, 
								borderWidth: selectedChannel==key ? 3: 0.3, 
								borderColor: selectedChannel==key ? "#44c": "black"
							}}>
							<Text style={{marginTop: "auto", marginBottom: "auto"}}>{chat}</Text>
						</Pressable>
					})
				}
			</ScrollView>
		</View>
		
	);
}

export default ChannelListScreen;