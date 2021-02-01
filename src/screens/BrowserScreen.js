import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, StatusBar } from 'react-native';
import { Background, Options, Item, Card, CreateAppointment, ButtonCreateAppointment } from '../components';
import { theme } from '../constants';
import { Block } from '../elements';
import { data } from '../utils';

const browser = () => {
  const [selectedOrigin, setSelectedOrigin] = useState(1);
  const [selected, setSelected] = useState(selectedOrigin);

  const [loadAdd, setLoadAdd] = useState(new Animated.Value(0));
  const [isAdd, setIsAdd] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    setAnimationCompleted(false);

    if (isAdd) {
      Animated.timing(loadAdd, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setAnimationCompleted(true);
      });
    }
  }, [isAdd]);

  return (
    <Block>
      <Block
        index={2}
        center
        middle
        absolute
        animated
        style={{
          bottom: 0,
          alignSelf: 'flex-end',
          width: loadAdd.interpolate({
            inputRange: [0, 1],
            outputRange: [100, Dimensions.get('window').width],
          }),
          height: loadAdd.interpolate({
            inputRange: [0, 1],
            outputRange: [140, Dimensions.get('window').height],
          }),
        }}
      >
        {!isAdd ? (
          <ButtonCreateAppointment setIsAdd={setIsAdd}/>
        ) : (
          <CreateAppointment
            loadAdd={loadAdd}
            animationCompleted={animationCompleted}
            setAnimationCompleted={setAnimationCompleted}
          />
        )}
      </Block>
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
        <Block flex={0.75}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: theme.sizes.padding * 2,
              paddingHorizontal: theme.sizes.padding,
            }}
          >
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              snapToAlignment="center"
              data={data}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item, index }) => (
                <Block
                  space={'between'}
                  height={0.75 * Dimensions.get('window').height}
                  width={
                    Dimensions.get('window').width - theme.sizes.padding * 2
                  }
                  key={index}
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {item.appointments.map((item2) => {
                    return (
                      <Card
                        title={item2.title}
                        important={item2.important}
                        hour={item2.hour}
                        address={item2.address}
                        date={item2.date}
                        icon={item2.icon}
                      />
                    );
                  })}
                </Block>
              )}
            />
          </ScrollView>
        </Block>
      </Background>
    </Block>
  );
};

export default browser;
