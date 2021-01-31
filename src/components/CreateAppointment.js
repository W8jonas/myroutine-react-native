import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Switch } from 'react-native';
import { theme } from '../constants';
import { Block, Button, Input, Photo, Text } from '../elements';
import { icons } from '../utils';

const createAppointment = ({ isAdd, loadAdd, animationCompleted }) => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [hour, setHour] = useState(new Date().toLocaleTimeString());
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <Block
      animated
      color={'white'}
      padding={[theme.sizes.padding * 2, theme.sizes.padding]}
      style={{
        borderRadius: theme.sizes.radius * 2,
        width: loadAdd.interpolate({
          inputRange: [0, 1],
          outputRange: [60, Dimensions.get('window').width],
        }),
        height: loadAdd.interpolate({
          inputRange: [0, 1],
          outputRange: [60, Dimensions.get('window').height],
        }),
      }}
    >
      {animationCompleted && (
        <Block>
          <Block flex={false} margin={theme.sizes.caption / 2}>
            <Button renderIcon={false} style>
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