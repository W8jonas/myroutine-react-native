import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, StatusBar } from 'react-native';
import { Background, Options, Item, Card, CreateAppointment, ButtonCreateAppointment } from '../components';
import { theme } from '../constants';
import { Block } from '../elements';
import { data } from '../utils';

const browser = () => {
  const [selectedOrigin, setSelectedOrigin] = useState(1);
  const [selected, setSelected] = useState(selectedOrigin);

  const [loadAdd] = useState(new Animated.Value(0));
  const [isAdd, setIsAdd] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const flatlistRef = useRef();

  useEffect(() => {
    if (isAdd) {
      Animated.timing(loadAdd, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setAnimationCompleted(true);
      });
    }

    if (isClosed) {
      Animated.timing(loadAdd, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setAnimationCompleted(false);
        setIsClosed(false);
        setIsAdd(false);
        loadAdd.setValue(0);
      });
    }

  }, [isAdd, isClosed]);

  const scrollAppointmentToIndex = (item) => {
    flatlistRef.current.scrollToIndex({
      animated: true,
      index: data.indexOf(item),
      viewPosition: 0.5,
    })
  }

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
          width: !isClosed
            ? loadAdd.interpolate({
                inputRange: [0, 0.5],
                outputRange: [100, Dimensions.get('window').width],
              })
            : loadAdd.interpolate({
                inputRange: [0.5, 1],
                outputRange: [Dimensions.get('window').width, 100],
              }),
          height: !isClosed
            ? loadAdd.interpolate({
                inputRange: [0, 0.5],
                outputRange: [140, Dimensions.get('window').height],
              })
            : loadAdd.interpolate({
                inputRange: [0.5, 1],
                outputRange: [Dimensions.get('window').height, 140],
              }),
        }}
      >
        {(!isClosed && isAdd) ||
          (!isAdd && !isClosed && (
            <ButtonCreateAppointment setIsAdd={setIsAdd} />
          ))}
        {(isAdd || isClosed) && (
          <CreateAppointment
            loadAdd={loadAdd}
            animationCompleted={animationCompleted}
            isAdd={isAdd}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
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
                  scrollAppointmentToIndex={scrollAppointmentToIndex}
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
              ref={flatlistRef}
              horizontal
              pagingEnabled
              scrollEnabled={false}
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
