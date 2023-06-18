import { View, TextInput, Text, KeyboardAvoidingView, ScrollView} from "react-native"
import { useState } from "react"

import { LinearGradient } from 'expo-linear-gradient';

function LoginScreen({route, navigation}) {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');
	const [codeVisible, setCodeVisible] = useState(false);
	const [marginTop, setMarginTop] = useState(500);
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
					<TextInput 
						style={{marginTop: marginTop, marginBottom: 15, margin: 40, height: 70, backgroundColor: "white", borderRadius: 10, padding: 5, fontSize: 20, paddingLeft: 10}}
						placeholder="Phone number"
						onFocus={() => {
							if (codeVisible) setMarginTop(370);
							else setMarginTop(420)
						}}
						onEndEditing={()=>{
							setMarginTop(500);
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
							onFocus={() => setMarginTop(370)}
							onEndEditing={()=>{
								setMarginTop(500);
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