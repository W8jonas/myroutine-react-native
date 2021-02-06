import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../constants';
import { Block, Button } from '../elements';

const buttonDelete = ({ setDimensionsButtonDelete }) => {
  const [dimensionsClicked, setDimensionsClicked] = useState({});

  const elementRef = useRef();

  useEffect(() => {
    if(Object.entries(dimensionsClicked).length !== 0) {
      setDimensionsButtonDelete(dimensionsClicked)
    }
  }, [dimensionsClicked])

  return (
    <Block
      middle
      center
      index={4}
      flex={false}
      absolute
      style={{
        bottom: 0,
        left: 0,
        right: 0,
      }}
      height={180}
    >
      <Button
        reference={elementRef}
        onLayout={(event) => {
          if (elementRef) {
            elementRef.current.measureInWindow((x, y, width, height) => {
              setDimensionsClicked({
                x,
                y,
                height,
                width,
              });
            });
          }
        }}
        renderIcon={false}
        style={{
          backgroundColor: theme.colors.danger,
          height: 60,
          width: 60,
          borderRadius: theme.sizes.radius * 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="md-trash" size={24} color={theme.colors.white} />
      </Button>
    </Block>
  );
}

export default buttonDelete;