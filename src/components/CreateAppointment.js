import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions, Switch } from 'react-native';
import { theme } from '../constants';
import CheckoutHeaderContext from '../context';
import { Block, Button, Input, Photo, Text } from '../elements';
import { icons } from '../utils';

const createAppointment = ({ loadAdd, animationCompleted, isAdd, setIsClosed, isClosed }) => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [hour, setHour] = useState(new Date().toLocaleTimeString());
  const [switchValue, setSwitchValue] = useState(false);

  const [loadCreator] = useState(new Animated.Value(0));

  const { toggleCheckoutHeader } = useContext(CheckoutHeaderContext);

  useEffect(() => {

    if(animationCompleted) {
      setTimeout(() => {
        Animated.timing(loadCreator, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }).start();
      }, 400)
    }
  }, [animationCompleted])

  return (
    <Block
      flex={false}
      animated
      color={'white'}
      padding={!isClosed ? [theme.sizes.padding * 2, theme.sizes.padding] : 0}
      style={{
        borderRadius: theme.sizes.radius * 2,
        width: !isClosed
          ? loadAdd.interpolate({
              inputRange: [0, 0.5],
              outputRange: [60, Dimensions.get('window').width],
            })
          : loadAdd.interpolate({
              inputRange: [0.5, 1],
              outputRange: [Dimensions.get('window').width, 60],
            }),
        height: !isClosed
          ? loadAdd.interpolate({
              inputRange: [0, 0.5],
              outputRange: [60, Dimensions.get('window').height],
            })
          : loadAdd.interpolate({
              inputRange: [0.5, 1],
              outputRange: [Dimensions.get('window').height, 60],
            }),
      }}
    >
      {animationCompleted && !isClosed && (
        <Block
          animated
          style={{
            opacity: loadCreator.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        >
          <Block flex={false} margin={theme.sizes.caption / 2}>
            <Button
              renderIcon={false}
              style
              onPress={() => {
                toggleCheckoutHeader();
                setIsClosed(true);
              }}
            >
              <MaterialIcons
                name="close"
                size={24}
                color={theme.colors.black}
              />
            </Button>
          </Block>
          <Block flex={false}>
            <Input label="Title" defaultValue={title} onChangeText={setTitle} />
            <Input
              label="Address"
              defaultValue={address}
              onChangeText={setAddress}
            />
            <Block row flex={false} space={'between'}>
              <Block flex={false} width={Dimensions.get('window').width / 2.5}>
                <Input
                  label="Date"
                  defaultValue={date}
                  onChangeText={setDate}
                />
              </Block>
              <Block flex={false} width={Dimensions.get('window').width / 2.5}>
                <Input
                  label="Hour"
                  defaultValue={hour}
                  onChangeText={setHour}
                />
              </Block>
            </Block>
          </Block>
          <Block
            border
            flex={false}
            center
            row
            space={'between'}
            padding={[theme.sizes.padding, 0]}
          >
            <Text bold>Important</Text>
            <Switch
              value={switchValue}
              onValueChange={setSwitchValue}
              trackColor={{
                false: '#767577',
                true: theme.colors.secondary,
              }}
            />
          </Block>
          <Block padding={[theme.sizes.padding, 0]}>
            <Text bold style={{ paddingLeft: theme.sizes.base }}>
              Icons
            </Text>
            <Block
              row
              flex={false}
              padding={[theme.sizes.base, 0]}
              style={{ flexWrap: 'wrap' }}
            >
              {icons.map((item) => {
                return (
                  <Block flex={false} margin={theme.sizes.caption / 2}>
                    <Button renderIcon={false} style>
                      <Photo image={item} width={46} height={46} />
                    </Button>
                  </Block>
                );
              })}
            </Block>
          </Block>
          <Block flex={false}>
            <Button>
              <Text white bold>
                Create appointment
              </Text>
            </Button>
          </Block>
        </Block>
      )}
    </Block>
  );
};

export default createAppointment;