import {View, Text, Pressable} from "react-native";
import {useState, useEffect} from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';

function getDate() {
	const d = new Date();
	let dateStr = d.toString().split(":")[0];
	return dateStr.substring(4, dateStr.length-3);
}

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
				axios.get(`https://8ee6-2600-1010-a002-bb4e-1572-156-8022-eaf1.ngrok-free.app/get_chat_summary?username=${route.params.userName}`).then((response) => {
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
			<Pressable 
				style={{flexDirection: "row", marginTop: 50}} 
				onPress={()=> {
					navigation.pop();
				}}
			>
				<Ionicons name="chevron-back" size={36} color="black"/>
				<Text style={{fontSize: 20, marginTop: 8}}>Back</Text>
			</Pressable>
			<View style={{flexDirection:"row"}}>
				<View style={{height: 120, width: 260, marginTop: 20, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 32, fontWeight: "bold", marginRight: "auto", marginLeft: "auto", marginTop: "auto", marginBottom: "auto"}}>Daily Summary</Text>
				</View>
				<View style={{height: 120, width: 110, marginTop: 20, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>{getDate()}</Text>
				</View>
			</View>

			<View style={{flexDirection:"row"}}>
				<View style={{height: 210, width: 220, marginTop: 15, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					{route.params.chatName!=null ? <Ionicons name="people-circle" style={{marginLeft: 43 }} size={145} color={route.params.color} />: <Ionicons name="person-circle" size={145} style={{marginLeft: 43 }} color={route.params.color} />}
					<Text style={{fontSize: 20, fontWeight: "bold", marginLeft: "auto", marginRight: "auto", marginTop: 0}}>{route.params.chatName!=null ? route.params.chatName: route.params.userName}</Text>
				</View>
				<View style={{height: 210, width: 150, marginTop: 15, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 20, marginLeft: 10, marginTop: 12}}><Text style={{fontWeight: "bold", fontSize: 30}}>{route.params.totalMessages}       </Text>Messages</Text>
					<Text style={{fontSize: 20, marginLeft: 10}}><Text style={{fontWeight: "bold", fontSize: 30}}>{route.params.unreadMessages}           </Text>Unread</Text>
					<Text style={{fontSize: 20, marginLeft: 10}}><Text style={{fontWeight: "bold", fontSize: 30}}>{route.params.attachments}         </Text>Attachments</Text>
				</View>
			</View>
			<View style={{width: 390, marginTop: 15, margin: 10, borderRadius: 10, backgroundColor: "white", shadowRadius: 10, shadowColor: "black", shadowOpacity: 0.5}}>
					<Text style={{fontSize: 20, margin: 20}}>{summary}</Text>
					<Pressable
						onPress={async() => {
							console.log(route.params.userName);
							axios.get(`https://8ee6-2600-1010-a002-bb4e-1572-156-8022-eaf1.ngrok-free.app/get_chat_summary?username=${route.params.userName}`).then((response) => {
								setSummary(response.data);
								storeSummary(route.params.userName, response.data);
							})
							}
						}
					>
						<Text style={{fontSize: 20, margin: 20, marginBottom: 10, marginLeft: "auto", color: "blue", fontWeight: "bold"}}>Generate new summary</Text>
					</Pressable>
					<A style={{margin: 20, marginTop: 0, marginLeft: "auto"}}href={`https://web.telegram.org/k/#@${route.params.userName}`}>
						<Text style={{fontSize: 20, color: "blue", fontWeight: "bold"}}>Read full chat</Text>
					</A>
					<Pressable>
						
					</Pressable>
			</View>
			
			</LinearGradient>
		</View>
	)
}

export default ChannelScreen;