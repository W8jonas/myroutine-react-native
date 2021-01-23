import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { theme } from '../constants';
import { Block, Button, Input, Text } from '../elements';

const signUp = ({ setIsSignUp }) => {
  const [name, setName] = useState('Marlon Marques');
  const [email, setEmail] = useState('marlon.belohd@gmail.com');
  const [password, setPassword] = useState('12345');
  
  const [checked, setChecked] = useState(false);

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
        <Button style={{ paddingTop: theme.sizes.base }} renderIcon={false} onPress={() => setChecked(prevChecked => !prevChecked)}>
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
            <Text caption black>
              I agree to the{' '}
              <Text
                caption
                bold
                secondary
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
