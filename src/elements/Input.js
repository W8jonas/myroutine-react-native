import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from '@expo/vector-icons/build/Ionicons';
import Block from './Block';
import Button from './Button';
import Text from './Text';
import { theme } from '../constants';

const Input = ({
  label,
  error,
  secure,
  rightLabel,
  rightStyle,
  onRightPress,
  next,
  done,
  email,
  phone,
  number,
  style,
  reference,
  box,
  type,
  mask,
  value,
  defaultValue,
  onChangeText,
  submitEditing,
}) => {
  const [isToggleSecure, setIsToggleSecure] = useState(false);

   function renderLabel() {
     return (
       <Block
         padding={[0, 0, theme.sizes.base - 10, theme.sizes.base]}
         flex={false}
       >
         {label ? (
           <Text bold black={!error}>
             {label}
           </Text>
         ) : null}
       </Block>
     );
   }

  function renderToggle() {
    const toggleSecure = isToggleSecure;

    if (!secure) return null;

    return (
      <Button
        renderIcon={false}
        style={styles.toggle}
        onPress={() =>
          setIsToggleSecure((toggleSecure) => (toggleSecure = !toggleSecure))
        }
      >
        {rightLabel ? (
          rightLabel
        ) : (
          <Icon
            color={theme.colors.black}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )}
      </Button>
    );
  }

  function renderRight() {
    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  const [height, setHeight] = useState(theme.sizes.base * 3);

  const toggleSecure = isToggleSecure;
  const isSecure = toggleSecure ? false : secure;
  const inputStyles = [
    box
      ? { height: height, paddingTop: 12, paddingBottom: 12 }
      : { height: theme.sizes.base * 3 },
    styles.input,
    error && { borderColor: theme.colors.accent },
    style,
  ];

  const keyType = next ? 'next' : done ? 'done' : 'done';

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  if (mask) {
    return (
      <Block flex={false} margin={[theme.sizes.base / 1.5, 0]}>
        {renderLabel()}
        <TextInputMask
          value={value}
          type={type}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoCompleteType={'off'}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          returnKeyType={keyType}
          onSubmitEditing={submitEditing}
          ref={reference}
        />
        {renderToggle()}
        {renderRight()}
      </Block>
    );
  } else {
    return (
      <Block flex={false} margin={[theme.sizes.base / 1.5, 0]}>
        {renderLabel()}
        <TextInput
          value={value}
          style={inputStyles}
          secureTextEntry={isSecure}
          autoCompleteType={'off'}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          returnKeyType={keyType}
          onSubmitEditing={submitEditing}
          ref={reference}
        />
        {renderToggle()}
        {renderRight()}
      </Block>
    );
  }
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: theme.colors.secondary,
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    paddingLeft: theme.sizes.base - 6,
    paddingRight: theme.sizes.base - 6,
    height: theme.sizes.base * 3,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base * 2.2,
    paddingRight: theme.sizes.caption,
    right: 0,
  },
});
