import React from 'react';
import { theme } from '../constants';
import { Block, Text } from '../elements';

const card = ({ title, important, hour, address, date }) => {
  
  const dt = new Date(date);  

  const monthNames = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'May', 
    'Jun', 
    'Jul', 
    'Aug', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dec',
  ]
  
  return (
    <Block
      flex={false}
      margin={[0, 0, theme.sizes.padding, 0]}
      padding={theme.sizes.caption}
      card
      color={'white'}
      width={140}
      height={200}
    >
      <Block flex={false}>
        <Text gray caption style={{ paddingBottom: theme.sizes.base }}>
          {important && 'IMPORTANT'}
        </Text>
        <Text bold>{title}</Text>
      </Block>
      <Block bottom column style={{ paddingTop: theme.sizes.caption }}>
        <Text
          secondary
          caption
          style={{ paddingBottom: theme.sizes.caption / 2 }}
        >
          {hour}
        </Text>
        <Text numberOfLines={2} secondary size={9}>
          {address}
        </Text>
        <Block row space={'between'}>
          <Block flex={false}></Block>
          <Block bottom column flex={false}>
            <Text bold>{dt.getDate()}</Text>
            <Text caption>{monthNames[dt.getMonth()]}</Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

export default card;