import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { theme } from '../constants';
import { Block, Button, Input, Text } from '../elements';

const signUp = ({ setIsSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Block
      color="white"
      padding={[theme.sizes.padding * 2, theme.sizes.padding]}
    >
      <Button style renderIcon={false} onPress={() => setIsSignUp(false)}>
        <Block flex={false} margin={[0, 0, theme.sizes.padding, 0]}>
          <AntDesign name={'arrowleft'} size={18} color={theme.colors.black} />
        </Block>
      </Button>
      <Block flex={false}>
        <Input label="Your Name" defaultValue={name} onChangeText={setName} />
        <Input label="Email" defaultValue={email} onChangeText={setEmail} />
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
        <Button>
          <Text bold white>
            Sign Up
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default signUp;
