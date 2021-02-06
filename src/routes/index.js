import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BrowserScreen from '../screens/BrowserScreen';

import AuthStack from './AuthStack';
import { theme } from '../constants';
import { Button } from '../elements';
import CheckoutHeaderContext from '../context/checkoutHeaderContext';

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
