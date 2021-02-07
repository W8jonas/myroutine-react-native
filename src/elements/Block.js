import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'

import { theme } from '../constants'

const Block = ({
	margin,
	padding,
	flex,
	index,
	row,
	column,
	center,
	middle,
	left,
	top,
	right,
	bottom,
	card,
	width,
	height,
	shadow,
	color,
	space,
	wrap,
	style,
	border,
	absolute,
	fullAbsolute,
	fullBorder,
	children,
	animated,
	idKey,
	onLayout,
	reference,
}) => {
	function handleMargins() {
		if (typeof margin === 'number') {
			return {
				marginTop: margin,
				marginRight: margin,
				marginBottom: margin,
				marginLeft: margin,
			}
		}

		if (typeof margin === 'object') {
			const marginSize = Object.keys(margin).length
			switch (marginSize) {
				case 1:
					return {
						marginTop: margin[0],
						marginRight: margin[0],
						marginBottom: margin[0],
						marginLeft: margin[0],
					}
				case 2:
					return {
						marginTop: margin[0],
						marginRight: margin[1],
						marginBottom: margin[0],
						marginLeft: margin[1],
					}
				case 3:
					return {
						marginTop: margin[0],
						marginRight: margin[1],
						marginBottom: margin[2],
						marginLeft: margin[1],
					}
				default:
					return {
						marginTop: margin[0],
						marginRight: margin[1],
						marginBottom: margin[2],
						marginLeft: margin[3],
					}
			}
		}
	}

	function handlePaddings() {
		if (typeof padding === 'number') {
			return {
				paddingTop: padding,
				paddingRight: padding,
				paddingBottom: padding,
				paddingLeft: padding,
			}
		}

		if (typeof padding === 'object') {
			const paddingSize = Object.keys(padding).length
			switch (paddingSize) {
				case 1:
					return {
						paddingTop: padding[0],
						paddingRight: padding[0],
						paddingBottom: padding[0],
						paddingLeft: padding[0],
					}
				case 2:
					return {
						paddingTop: padding[0],
						paddingRight: padding[1],
						paddingBottom: padding[0],
						paddingLeft: padding[1],
					}
				case 3:
					return {
						paddingTop: padding[0],
						paddingRight: padding[1],
						paddingBottom: padding[2],
						paddingLeft: padding[1],
					}
				default:
					return {
						paddingTop: padding[0],
						paddingRight: padding[1],
						paddingBottom: padding[2],
						paddingLeft: padding[3],
					}
			}
		}
	}

	const blockStyles = [
		styles.block,
		width && { width },
		height && { height },
		absolute && { position: 'absolute' },
		fullAbsolute && [StyleSheet.absoluteFill],
		index && { zIndex: index },
		border && styles.border,
		fullBorder && styles.fullBorder,
		flex && { flex },
		flex === false && { flex: null }, // redefinir / desativar flex
		row && styles.row,
		column && styles.column,
		center && styles.center,
		middle && styles.middle,
		left && styles.left,
		right && styles.right,
		top && styles.top,
		bottom && styles.bottom,
		margin && { ...handleMargins() },
		padding && { ...handlePaddings() },
		card && styles.card,
		shadow && styles.shadow,
		space && { justifyContent: `space-${space}` },
		wrap && { flexWrap: 'wrap' },
		color && styles[color], // estilos predefinidos cores para backgroundColor
		color && !styles[color] && { backgroundColor: color }, // backgroundColor personalizado
		style, // reescrever estilos predefinidos
	]

	if (animated) {
		return (
			<Animated.View
				ref={reference}
				key={idKey}
				style={blockStyles}
				onLayout={onLayout}
			>
				{children}
			</Animated.View>
		)
	}

	return (
		<View ref={reference} key={idKey} style={blockStyles} onLayout={onLayout}>
			{children}
		</View>
	)
}

export default Block

export const styles = StyleSheet.create({
	block: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	row: {
		flexDirection: 'row',
	},
	column: {
		flexDirection: 'column',
	},
	card: {
		borderRadius: theme.sizes.radius / 2,
	},
	center: {
		alignItems: 'center',
	},
	middle: {
		justifyContent: 'center',
	},
	left: {
		justifyContent: 'flex-start',
	},
	right: {
		justifyContent: 'flex-end',
	},
	top: {
		justifyContent: 'flex-start',
	},
	bottom: {
		justifyContent: 'flex-end',
	},
	shadow: {
		shadowColor: theme.colors.gray,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 3, // for android devices
	},
	border: {
		borderBottomWidth: 2,
		borderColor: theme.colors.tertiary,
	},
	fullBorder: {
		borderWidth: 3,
		borderColor: theme.colors.secondary,
	},

	primary: { backgroundColor: theme.colors.primary },
	secondary: { backgroundColor: theme.colors.secondary },
	tertiary: { backgroundColor: theme.colors.tertiary },
	white: { backgroundColor: theme.colors.white },
	gray: { backgroundColor: theme.colors.gray },
	black: { backgroundColor: theme.colors.black },
})
