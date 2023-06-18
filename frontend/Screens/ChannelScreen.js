import {View, Text} from "react-native";
import {useState, useEffect} from "react";
import axios from "axios";

function ChannelScreen({route, navigation}) {
	console.log(route.params.userName);
	const [summary, setSummary] = useState('');
	useEffect(() => {
		axios.get(`https://3cd6-135-180-118-61.ngrok-free.app/get_chat_summary?username=${route.params.userName}`).then((response) => {
			console.log(response.data);
			setSummary(response.data);
		})
	}, []);
	return (
		<View>
			<Text>
				{summary}
			</Text>
		</View>
	)
}

export default ChannelScreen;