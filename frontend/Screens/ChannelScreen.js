import {View, Text} from "react-native";
import {useState, useEffect} from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
				axios.get(`https://836e-2607-f140-6000-18-f4c2-ffc7-13ed-5cc6.ngrok-free.app/get_chat_summary?username=${route.params.userName}`).then((response) => {
					setSummary(response.data);
					storeSummary(route.params.userName, response.data);
				})
			}
		}
		fetch();
		
	}, []);
	return (
		<View>
			<LinearGradient
        	// Background Linear Gradient
        		colors={['#f12711', '#f5af19']}
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					zIndex: 1
				}}
      		>
			
			<View style={{flexDirection:"row"}}>
				<View style={{height: 120, width: 260, marginTop: 100, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 32, fontWeight: "bold", marginRight: "auto", marginLeft: "auto", marginTop: "auto", marginBottom: "auto"}}>Daily Summary</Text>
				</View>
				<View style={{height: 120, width: 110, marginTop: 100, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>June 18, 2023</Text>
				</View>
			</View>

			<View style={{flexDirection:"row"}}>
				<View style={{height: 190, width: 220, marginTop: 15, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					{route.params.chatName!=null ? <Ionicons name="people-circle" style={{marginLeft: 55 }}size={125} color={route.params.color} />: <Ionicons name="person-circle" size={125} style={{marginLeft: 55 }} color={route.params.color} />}
					<Text style={{fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>{route.params.chatName!=null ? route.params.chatName: route.params.userName}</Text>
				</View>
				<View style={{height: 190, width: 150, marginTop: 15, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 20, fontWeight: "bold", margin: 10}}>55 Messages</Text>
					<Text style={{fontSize: 20, fontWeight: "bold", margin: 10}}>53 Unread</Text>
					<Text style={{fontSize: 19, fontWeight: "bold", margin: 10}}>22 Attachments</Text>
				</View>
			</View>
			<View style={{height: 300, width: 390, marginTop: 15, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 20, fontWeight: "bold", margin: 20}}>{summary}</Text>
			</View>
			
			</LinearGradient>
		</View>
	)
}

export default ChannelScreen;