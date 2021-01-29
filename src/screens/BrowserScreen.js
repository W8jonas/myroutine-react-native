import React, { useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { Background, Options, Item } from '../components';
import { Block } from '../elements';
import { data } from '../utils';

const browser = () => {
  
  const [selectedOrigin, setSelectedOrigin] = useState(1);
  const [selected, setSelected] = useState(selectedOrigin);

  return (
    <Block>
      <StatusBar barStyle="dark-content" />
      <Background>
        <Options
          renderContent={({
            dimensionsOptionClicked,
            dimensionsOptionOrigin,
          }) => (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <Item
                  item={item}
                  selectedOrigin={selectedOrigin}
                  setSelectedOrigin={setSelectedOrigin}
                  selected={selected}
                  setSelected={setSelected}
                  dimensionsOptionClicked={dimensionsOptionClicked}
                  dimensionsOptionOrigin={dimensionsOptionOrigin}
                />
              )}
            />
          )}
        />
      </Background>
    </Block>
  );
};

export default browser;
