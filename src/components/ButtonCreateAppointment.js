import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { theme } from '../constants';
import CheckoutHeaderContext from '../context/checkoutHeaderContext';
import { Button } from '../elements';

const buttonCreateAppointment = ({ setIsAdd, backgroundColor, textColor}) => {
  const { toggleCheckoutHeader } = useContext(CheckoutHeaderContext);

  return (
    <Button
      shadow
      style={{
        backgroundColor,
        height: 60,
        width: 60,
        borderRadius: theme.sizes.radius * 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      renderIcon={false}
      onPress={() => {
        setIsAdd(true)
        toggleCheckoutHeader()
      }}
    >
      <MaterialIcons name="playlist-add" size={24} color={textColor} />
    </Button>
  );
};

export default buttonCreateAppointment;