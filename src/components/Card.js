import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { theme } from '../constants';
import { Block, Button, Photo, Text } from '../elements';

const card = ({
  index,
  title,
  important,
  hour,
  address,
  date,
  icon,
  backgroundColor,
  textColor,
  draggingCard,
  setDraggingCard,
  setAnimatingCard,
  dimensionsButtonDelete,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [currentXY, setCurrentXY] = useState({});
  const [deleting, setDeleting] = useState(false);

  const [translateY] = useState(new Animated.Value(0));
  const [translateX] = useState(new Animated.Value(0));

  const [showCard, setShowCard] = useState(true);
  const [finishedAnimation, setFinishedAnimation] = useState(false);

  const [deletingProgress] = useState(new Animated.Value(0));

  const [zIndexCard, setZIndexCard] = useState(3);

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
  ];

  const checkApproachDelete = () => {
    const detectionAreaSize = 100;

    if (currentXY.y > dimensionsButtonDelete.y - detectionAreaSize) {
      translateX.setValue(Math.abs(currentXY.x - dimensionsButtonDelete.x));
      translateY.setValue(Math.abs(currentXY.y - dimensionsButtonDelete.y));
      return setDeleting(true);
    }

    return setDeleting(false);
  };

  useEffect(() => {
    if (Object.entries(currentXY).length !== 0) {
      checkApproachDelete();
    }
  }, [currentXY]);

  useEffect(() => {
    if(finishedAnimation) {
      deleteAppointment();
    }
  }, [finishedAnimation])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (event, gestureState) => {
        setCurrentXY({
          x: event.nativeEvent.pageX,
          y: event.nativeEvent.pageY,
        });
        setDraggingCard(true);
        setAnimatingCard(true);
        setZIndexCard(4);

        Animated.event(
          [
            null,
            {
              dx: pan.x,
              dy: pan.y,
            },
          ],
          { useNativeDriver: false }
        )(event, gestureState);
      },
      onPanResponderRelease: () => {
        setDraggingCard(false);
        setZIndexCard(3);
        translateX.setValue(0);
        translateY.setValue(0);

        setFinishedAnimation(true);
      },
    })
  ).current;

  const deleteAppointment = () => {
    if(deleting) {
      Animated.timing(deletingProgress, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setDeleting(false);
        setShowCard(false);
        setAnimatingCard(false);
      });
    } else {
      setAnimatingCard(false);
      setFinishedAnimation(false);
      Animated.spring(pan, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      {showCard && (
        <Animated.View
          key={index}
          style={{
            zIndex: zIndexCard,
            transform: [
              {
                translateX:
                  !draggingCard && deleting
                    ? deletingProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [pan.x._value, dimensionsButtonDelete.x],
                      })
                    : pan.x,
              },
              {
                translateY:
                  !draggingCard && deleting
                    ? deletingProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          pan.y._value,
                          dimensionsButtonDelete.y / 2,
                        ],
                      })
                    : pan.y,
              },
              {
                scale: deleting
                  ? translateX.interpolate({
                      inputRange: [0, dimensionsButtonDelete.x],
                      outputRange: [0.3, 0.8],
                    })
                  : 1,
              },
            ],
            opacity: !draggingCard && deleting ? deletingProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            }) : 1
          }}
          {...panResponder.panHandlers}
        >
          <Button renderIcon={false} style>
            <Block
              flex={false}
              margin={[
                0,
                theme.sizes.caption / 2,
                theme.sizes.padding,
                theme.sizes.caption / 2,
              ]}
              padding={theme.sizes.caption}
              card
              color={backgroundColor}
              width={140}
              height={200}
            >
              <Block flex={false}>
                <Text gray caption style={{ paddingBottom: theme.sizes.base }}>
                  {important && 'IMPORTANT'}
                </Text>
                <Text bold color={textColor}>
                  {title}
                </Text>
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
                  <Block center bottom flex={false}>
                    <Photo image={icon} width={28} height={28} />
                  </Block>
                  <Block bottom column flex={false}>
                    <Text bold color={textColor}>
                      {dt.getDate()}
                    </Text>
                    <Text caption color={textColor}>
                      {monthNames[dt.getMonth()]}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Button>
        </Animated.View>
      )}
    </>
  );
};

export default card;