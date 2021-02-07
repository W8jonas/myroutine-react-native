import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons'

import { theme } from '../constants'
import { useTheme } from '../context/themeContext'
import {
	Block, Button, Input, Text,
} from '../elements'

const SignIn = ({ setIsSignIn, navigation }) => {
	const [nameOrEmail, setNameOrEmail] = useState('marlon.belohd@gmail.com')
	const [password, setPassword] = useState('12345')

	const { colors } = useTheme()

	return (
		<Block
			color={colors.background}
			padding={[theme.sizes.padding * 2, theme.sizes.padding]}
		>
			<Button style renderIcon={false} onPress={() => setIsSignIn(false)}>
				<Block flex={false} margin={[0, 0, theme.sizes.padding, 0]}>
					<AntDesign name="arrowleft" size={18} color={colors.text} />
				</Block>
			</Button>
			<Block flex={false}>
				<Input
					textColor={colors.text}
					label="Your Name or Email"
					defaultValue={nameOrEmail}
					onChangeText={setNameOrEmail}
				/>
				<Input
					textColor={colors.text}
					label="Password"
					secure
					defaultValue={password}
					onChangeText={setPassword}
				/>
			</Block>
			<Block
				flex={false}
				padding={[theme.sizes.padding * 2, 0, theme.sizes.padding, 0]}
			>
				<Button
					colorBackgroundIcon={colors.background}
					colorIcon={colors.text}
					onPress={() => navigation.navigate('Browser')}
				>
					<Text bold white>
						Sign In
					</Text>
				</Button>
			</Block>
		</Block>
	)
}

export default SignIn
