import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons'

import { theme } from '../constants'
import { useTheme } from '../context/themeContext'
import {
	Block, Button, Input, Text,
} from '../elements'

const SignUp = ({ setIsSignUp }) => {
	const [name, setName] = useState('Marlon Marques')
	const [email, setEmail] = useState('marlon.belohd@gmail.com')
	const [password, setPassword] = useState('12345')

	const [checked, setChecked] = useState(false)

	const { colors } = useTheme()

	return (
		<Block
			color={colors.background}
			padding={[theme.sizes.padding * 2, theme.sizes.padding]}
		>
			<Button style renderIcon={false} onPress={() => setIsSignUp(false)}>
				<Block flex={false} margin={[0, 0, theme.sizes.padding, 0]}>
					<AntDesign name="arrowleft" size={18} color={colors.text} />
				</Block>
			</Button>
			<Block flex={false}>
				<Input
					textColor={colors.text}
					label="Your Name"
					defaultValue={name}
					onChangeText={setName}
				/>
				<Input
					textColor={colors.text}
					label="Email"
					defaultValue={email}
					onChangeText={setEmail}
				/>
				<Input
					textColor={colors.text}
					label="Password"
					secure
					defaultValue={password}
					onChangeText={setPassword}
				/>
				<Button
					style={{ paddingTop: theme.sizes.base }}
					renderIcon={false}
					onPress={() => setChecked((prevChecked) => !prevChecked)}
				>
					<Block
						center
						flex={false}
						row
						padding={[0, theme.sizes.padding, 0, 0]}
					>
						<Block flex={false} padding={[0, theme.sizes.base, 0, 0]}>
							<AntDesign
								name={checked ? 'checksquare' : 'checksquareo'}
								color={theme.colors.secondary}
								size={18}
							/>
						</Block>
						<Text caption color={colors.text}>
							I agree to the{' '}
							<Text
								caption
								bold
								secondary
								textColor={colors.text}
								style={{ textDecorationLine: 'underline' }}
							>
								Terms & Conditions and Privacy Policy
							</Text>
						</Text>
					</Block>
				</Button>
			</Block>
			<Block
				flex={false}
				padding={[theme.sizes.padding * 2, 0, theme.sizes.padding, 0]}
			>
				<Button colorBackgroundIcon={colors.background} colorIcon={colors.text}>
					<Text bold white>
						Sign Up
					</Text>
				</Button>
			</Block>
		</Block>
	)
}

export default SignUp
