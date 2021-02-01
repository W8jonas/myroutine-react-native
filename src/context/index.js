import { createContext } from 'react';

const CheckoutHeaderContext = createContext({
  hideHeader: false,
  toggleCheckoutHeader: () => {},
});

export default CheckoutHeaderContext;