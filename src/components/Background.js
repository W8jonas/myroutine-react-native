import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet } from 'react-native';
import { Block } from '../elements';
import { theme } from '../constants';
import { BlurView } from 'expo-blur';

const background = ({ children }) => {
  return (
    <Block>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.background}
      />
      <LinearGradient
        colors={['transparent', theme.colors.black]}
        style={StyleSheet.absoluteFill}
        locations={[0.4, 0.9]}
      />
      <BlurView tint={'dark'} intensity={80} style={StyleSheet.absoluteFill}>
        {children}
      </BlurView>
    </Block>
  );
}

export default background;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});