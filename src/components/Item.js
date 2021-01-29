import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../constants';
import { Block, Button, Text } from '../elements';

const item = ({ 
  item, 
  setSelected, 
  selected, 
  setSelectedOrigin, 
  selectedOrigin, 
  dimensionsOptionOrigin, 
  dimensionsOptionClicked 
}) => {
  
  const [dimensionsClicked, setDimensionsClicked] = useState({});
  const [dimensionsOrigin, setDimensionsOrigin] = useState({});

  const elementRef = useRef();

  useEffect(() => {
    if (selectedOrigin === dimensionsOrigin.id) {
      dimensionsOptionOrigin(dimensionsOrigin);
    }
    if (selected === dimensionsClicked.id) {
      dimensionsOptionClicked(dimensionsClicked);
    }
  }, [selected])


  return (
    <Button
      renderIcon={false}
      style
      onPress={(() => { setSelectedOrigin(selected), setSelected(item.id) })}
      reference={elementRef}
      onLayout={(event) => {
        if (elementRef) {
          elementRef.current.measureInWindow((x, y, width, height) => {
            setDimensionsClicked({
              id: item.id,
              x,
              y,
              height,
              width,
            });
            setDimensionsOrigin({
              id: item.id,
              x,
              y,
              height,
              width,
            });
          });
        }
      }}
    >
      <Block flex={false} padding={[0, theme.sizes.caption / 2]}>
        <Text bold gray={selected !== item.id} black={selected === item.id}>
          {item.name}
        </Text>
      </Block>
    </Button>
  );
};

export default item;