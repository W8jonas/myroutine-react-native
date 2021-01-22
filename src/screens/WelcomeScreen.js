import React, { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { Block, Button, Text } from '../elements';
import { theme } from '../constants';
import { Background } from '../components';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';


const welcome = () => {

  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [positionAreaSignIn] = useState(
    new Animated.Value(Dimensions.get('window').width)
  );
  const [positionAreaSignUp] = useState(
    new Animated.Value(Dimensions.get('window').width)
  );
  const [positionButton] = useState(new Animated.Value(0));

  useEffect(() => {
    /** Area */
    if (isSignIn) {
      Animated.timing(positionAreaSignIn, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (!isSignIn) {
      Animated.timing(positionAreaSignIn, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    if (isSignUp) {
      Animated.timing(positionAreaSignUp, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (!isSignUp) {
      Animated.timing(positionAreaSignUp, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    /** Button */
    if (isSignIn || isSignUp) {
      Animated.timing(positionButton, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (!isSignIn || !isSignUp) {
      Animated.timing(positionButton, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSignIn, isSignUp]);


  const renderSignIn = () => {
    return (
      <Block
        animated
        absolute
        index={2}
        height={Dimensions.get('window').height / 1.8}
        width={Dimensions.get('window').width}
        style={{ right: 0, left: positionAreaSignIn, bottom: 0 }}
      >
        <SignInScreen setIsSignIn={setIsSignIn} />
      </Block>
    ); 
  }

  const renderSignUp = () => {
    return (
      <Block
        animated
        absolute
        index={2}
        height={Dimensions.get('window').height / 1.5}
        width={Dimensions.get('window').width}
        style={{ right: 0, left: positionAreaSignUp, bottom: 0 }}
      >
        <SignUpScreen setIsSignUp={setIsSignUp} />
      </Block>
    ); 
  }

  return (
    <Block>
      {renderSignIn()}
      {renderSignUp()}
      <Background>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]}>
          <Block
            flex={0.35}
            middle
            padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          >
            <Text white bold h2>
              Let us help you
            </Text>
            <Block
              flex={false}
              style={{ paddingTop: theme.sizes.base }}
              width={Dimensions.get('window').width / 2.2}
            >
              <Text white light>
                Don't go crazy, schedule your appointments and make time to
                breathe.
              </Text>
            </Block>
          </Block>
          <Block column bottom flex={0.75}>
            <Block flex={false} animated style={{ right: positionButton }}>
              <Button onPress={() => setIsSignIn(true)}>
                <Text white bold>
                  Sign In
                </Text>
              </Button>
              <Button fullStyle={false} onPress={() => setIsSignUp(true)}>
                <Text white bold>
                  Sign Up
                </Text>
              </Button>
            </Block>
            <Block flex={false} padding={[theme.sizes.base, 0]}>
              <Button renderIcon={false} style>
                <Text
                  center
                  white
                  bold
                  style={{ textDecorationLine: 'underline' }}
                >
                  recover my password
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Background>
    </Block>
  );
};

export default welcome;
