import React from 'react'
import { Text, StyleSheet } from 'react-native'

import { theme } from '../constants'

const Typography = ({
	h1,
	h2,
	h3,
	title,
	body,
	caption,
	size,
	transform,
	align,
	// estilos
	regular,
	bold,
	medium,
	weight,
	light,
	center,
	right,
	spacing, // letter-spacing
	height, // line-height
	// colors
	color,
	primary,
	secondary,
	tertiary,
	black,
	white,
	gray,
	style,
	children,
	numberOfLines,
}) => {
	const textStyles = [
		styles.text,
		h1 && styles.h1,
		h2 && styles.h2,
		h3 && styles.h3,
		title && styles.title,
		body && styles.body,
		caption && styles.caption,
		size && { fontSize: size },
		transform && { textTransform: transform },
		align && { textAlign: align },
		height && { lineHeight: height },
		spacing && { letterSpacing: spacing },
		weight && { fontWeight: weight },
		regular && styles.regular,
		bold && styles.bold,
		medium && styles.medium,
		light && styles.light,
		center && styles.center,
		right && styles.right,
		color && styles[color],
		color && !styles[color] && { color },
		// color shortcuts
		primary && styles.primary,
		secondary && styles.secondary,
		tertiary && styles.tertiary,
		black && styles.black,
		white && styles.white,
		gray && styles.gray,
		style, // rewrite predefined styles
	]

	return <Text numberOfLines={numberOfLines} style={textStyles}>{children}</Text>
}

export default Typography

const styles = StyleSheet.create({
	// default style
	text: {
		fontSize: theme.sizes.font,
		color: theme.colors.black,
	},
	// variations
	regular: {
		fontWeight: 'normal',
	},
	bold: {
		fontWeight: 'bold',
	},
	semibold: {
		fontWeight: '500',
	},
	medium: {
		fontWeight: '500',
	},
	light: {
		fontWeight: '200',
	},
	// position
	center: { textAlign: 'center' },
	right: { textAlign: 'right' },
	// colors
	primary: { color: theme.colors.primary },
	secondary: { color: theme.colors.secondary },
	tertiary: { color: theme.colors.tertiary },
	black: { color: theme.colors.black },
	white: { color: theme.colors.white },
	gray: { color: theme.colors.gray },
	// fonts
	h1: theme.fonts.h1,
	h2: theme.fonts.h2,
	h3: theme.fonts.h3,
	title: theme.fonts.title,
	body: theme.fonts.body,
	caption: theme.fonts.caption,
})
