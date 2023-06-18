import { View, TextInput, KeyboardAvoidingView, ScrollView} from "react-native"
import { useState } from "react"

function LoginScreen({route, navigation}) {
	const [phone, setPhone] = useState('');
	const [code, setCode] = useState('');
	const [codeVisible, setCodeVisible] = useState(false);
	const [marginTop, setMarginTop] = useState(500);
	return (
		<View>
			<ScrollView>
				<TextInput 
					style={{marginTop: marginTop, marginBottom: 30, margin: 40, height: 70, borderWidth: 2, borderRadius: 10, padding: 5}}
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
						style={{marginTop: 0, margin: 40, height: 70, borderWidth: 2, borderRadius: 10, padding: 5}}
						placeholder="5 Digit Code"
						inputMode="numeric"
						onFocus={() => setMarginTop(370)}
						onEndEditing={()=>{
							setMarginTop(500);
							navigation.navigate("Chats");
						}}
						returnKeyType="done"
					>
					</TextInput>
				}
			</ScrollView>
			
		</View>
	)
}

export default LoginScreen;