import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BrowserScreen from '../screens/BrowserScreen';

import AuthStack from './AuthStack';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants';
import { Button } from '../elements';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Browser"
          component={BrowserScreen}
          options={{
            headerBackImage: () => (
              <Button renderIcon={false} style>
                <AntDesign
                  name={'arrowleft'}
                  color={theme.colors.black}
                  size={18}
                />
              </Button>
            ),
            headerRight: () => (
              <MaterialIcons
                name={'brightness-6'}
                size={18}
                color={theme.colors.black}
              />
            ),
            headerTransparent: true,
            headerBackTitleVisible: null,
            title: null,
            headerLeftContainerStyle: {
              alignItems: 'center',
              marginLeft: Platform.OS === 'ios' ? theme.sizes.padding : 0,
            },
            headerRightContainerStyle: {
              alignItems: 'center',
              marginRight: Platform.OS === 'ios' ? theme.sizes.padding : 0,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
