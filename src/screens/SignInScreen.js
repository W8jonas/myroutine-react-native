import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { theme } from '../constants';
import { Block, Button, Input, Text } from '../elements';

const signIn = ({ setIsSignIn, navigation }) => {

  const [nameOrEmail, setNameOrEmail] = useState('marlon.belohd@gmail.com');
  const [password, setPassword] = useState('12345');
  
  return (
    <Block
      color="white"
      padding={[theme.sizes.padding * 2, theme.sizes.padding]}
    >
      <Button style renderIcon={false} onPress={() => setIsSignIn(false)}>
        <Block flex={false} margin={[0, 0, theme.sizes.padding, 0]}>
          <AntDesign name={'arrowleft'} size={18} color={theme.colors.black} />
        </Block>
      </Button>
      <Block flex={false}>
        <Input
          label="Your Name or Email"
          defaultValue={nameOrEmail}
          onChangeText={setNameOrEmail}
        />
        <Input
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
        <Button onPress={() => navigation.navigate('Browser')}>
          <Text bold white>
            Sign In
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default signIn;
