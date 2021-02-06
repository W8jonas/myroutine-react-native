import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { theme } from '../constants';
import { Block, Text } from '../elements';

const Bar = ({ sourceBarDimensions, destineBarDimensions }) => {

  const [transitionProgress, setTransitionProgress] = useState(new Animated.Value(0));
  const [openingInitTranslateX, setOpeningInitTranslateX] = useState(0);

  const [left, setLeft] = useState(0);

  useEffect(() => {

    if (Object.entries(sourceBarDimensions).length !== 0 && 
    Object.entries(destineBarDimensions).length !== 0) {

      Animated.timing(transitionProgress, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setLeft(destineBarDimensions.x - 400)
        transitionProgress.setValue(0);
      });

      const translateInitX = sourceBarDimensions.x + sourceBarDimensions.width / 2;
      const translateDestX = destineBarDimensions.x + destineBarDimensions.width / 2;
      
      setOpeningInitTranslateX(translateDestX - translateInitX);
    }
  }, [sourceBarDimensions, destineBarDimensions]);

  return (
    <Block
      animated
      absolute
      flex={false}
      width={60}
      height={4}
      color={'tertiary'}
      margin={theme.sizes.caption / 2}
      style={{
        bottom: 10,
        left: left,
        transform: [
          {
            translateX: transitionProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [0,openingInitTranslateX],
            }),
          },
        ],
      }}
    />
  );
}

const options = ({ renderContent, backgroundColor, textColor }) => {
  
  const [dimensionsSource, setDimensionsSource] = useState({});
  const [dimensionsDestine, setDimensionsDestine] = useState({});

  return (
    <Block
      flex={0.25}
      color={backgroundColor}
      padding={[
        theme.sizes.padding * 2,
        theme.sizes.padding,
        0,
        theme.sizes.padding,
      ]}
    >
      <Block flex={false} padding={[theme.sizes.padding * 2.5, 0]}>
        <Text h3 bold color={textColor}>
          My routine
        </Text>
      </Block>
      {renderContent({
        dimensionsOptionClicked: setDimensionsDestine,
        dimensionsOptionOrigin: setDimensionsSource,
      })}
      <Block column bottom>
        {dimensionsSource && (
          <Bar
            sourceBarDimensions={dimensionsSource}
            destineBarDimensions={dimensionsDestine}
          />
        )}
      </Block>
    </Block>
  );
};

export default options;