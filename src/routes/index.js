import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BrowserScreen from '../screens/BrowserScreen';

import AuthStack from './AuthStack';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants';
import { Button } from '../elements';
import CheckoutHeaderContext from '../context';

const Stack = createStackNavigator();

export default function Navigator() {

  const [hideHeader, setHideHeader] = useState(false);

  const toggleCheckoutHeader = () => {
    setHideHeader(!hideHeader);
  };

  return (
    <CheckoutHeaderContext.Provider
      value={{ hideHeader, toggleCheckoutHeader }}
    >
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
              headerShown: !hideHeader,
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
                <Button renderIcon={false} style>
                  <MaterialIcons
                    name={'brightness-6'}
                    size={18}
                    color={theme.colors.black}
                  />
                </Button>
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
    </CheckoutHeaderContext.Provider>
  );
}
