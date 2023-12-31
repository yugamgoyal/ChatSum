import { Animated, View, TextInput, Text, Image, KeyboardAvoidingView, ScrollView} from "react-native"
import { useRef, useState } from "react"
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";

function LoginScreen({route, navigation}) {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');
	const [codeVisible, setCodeVisible] = useState(false);
	const [marginTop, setMarginTop] = useState(20);
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
				<ScrollView>
					{/* <Entypo name="circle" size={200} color="white" style={{marginLeft: "auto", marginRight: "auto", marginTop: 180}}/> */}
					<Image source={require("../assets/chatSum.png")} style={{opacity: marginTop>0 ? 1: 0, marginLeft: "auto", marginRight: "auto", marginTop: 180, width: 200, height: 200}}></Image>
					<Text style={{color: "white", fontSize: 50, marginLeft: "auto", marginRight: "auto", marginTop: marginTop, fontWeight: "bold"}}>ChatSum</Text>
					<TextInput 
						style={{marginTop: 80, marginBottom: 15, margin: 40, height: 70, backgroundColor: "white", borderRadius: 10, padding: 5, fontSize: 20, paddingLeft: 10}}
						inputMode="numeric"
						placeholder="Phone number"
						value={phone}
						onChangeText={(newText) => setPhone(newText)}
						onFocus={() => {
							setMarginTop(-130)
						}}
						onEndEditing={async()=>{
							const bodyForm = new FormData();
							bodyForm.append("phone_number", phone);
							axios.post("https://8ee6-2600-1010-a002-bb4e-1572-156-8022-eaf1.ngrok-free.app/verify_phone", bodyForm).then((response) => {
								console.log(response.data);
							})
							setMarginTop(20);
							setCodeVisible(true);
						}}
						returnKeyType="done"
					>
					</TextInput>
					{codeVisible && 
						<TextInput 
							style={{marginTop: 0, margin: 40, height: 70, backgroundColor: "white", borderRadius: 10, padding: 5, fontSize: 20, paddingLeft: 10}}
							placeholder="5 Digit Code"
							inputMode="numeric"
							onFocus={() => setMarginTop(-130)}
							onEndEditing={()=>{
								setMarginTop(20);
								navigation.replace("Chats");
							}}
							returnKeyType="done"
						>
						</TextInput>
					}
				</ScrollView>
			</LinearGradient>
			
			
		</View>
	)
}

export default LoginScreen;