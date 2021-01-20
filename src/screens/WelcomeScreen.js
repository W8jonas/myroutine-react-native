import React from 'react';
import { Dimensions } from 'react-native';
import { Block, Button, Text } from '../elements';
import { theme } from '../constants';
import { Background } from '../components';


const welcome = () => {
  return (
    <Block>
      <Background>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]}>
          <Block
            flex={0.4}
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
          <Block column bottom flex={0.6}>
            <Button>
              <Text white bold>
                Sign In
              </Text>
            </Button>
            <Button fullStyle={false}>
              <Text white bold>
                Sign Up
              </Text>
            </Button>
            <Block flex={false} padding={[theme.sizes.base, 0]}>
              <Button renderIcon={false} style={null}>
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
