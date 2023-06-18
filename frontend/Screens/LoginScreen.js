import { View, TextInput, Text, KeyboardAvoidingView, ScrollView} from "react-native"
import { useState } from "react"
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
					<Entypo name="circle" size={200} color="white" style={{marginLeft: "auto", marginRight: "auto", marginTop: 180}}/>
					<Text style={{color: marginTop<0 ? "black": "white", fontSize: 50, marginLeft: "auto", marginRight: "auto", marginTop: marginTop, fontWeight: "bold"}}>ChatSum</Text>
					<TextInput 
						style={{marginTop: 80, marginBottom: 15, margin: 40, height: 70, backgroundColor: "white", borderRadius: 10, padding: 5, fontSize: 20, paddingLeft: 10}}
						inputMode="numeric"
						placeholder="Phone number"
						onFocus={() => {
							setMarginTop(-130)
						}}
						onEndEditing={()=>{
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