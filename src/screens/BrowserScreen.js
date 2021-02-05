import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, StatusBar } from 'react-native';
import { Background, Options, Item, Card, CreateAppointment, ButtonCreateAppointment, ButtonDelete } from '../components';
import { theme } from '../constants';
import { useTheme } from '../context/themeContext';
import { Block, Button } from '../elements';
import { data } from '../utils';

const browser = ({ navigation }) => {
  const [selectedOrigin, setSelectedOrigin] = useState(1);
  const [selected, setSelected] = useState(selectedOrigin);

  const [loadAdd] = useState(new Animated.Value(0));
  const [isAdd, setIsAdd] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const [draggingCard, setDraggingCard] = useState(false);
  const [appointmentFlatListHeight, setAppointmentFlatListHeight] = useState(0);
  const appointmentFlatListRef = useRef();
  const [dimensionsButtonDelete, setDimensionsButtonDelete] = useState({});

  const { colors, isDark, setScheme } = useTheme();

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: () => (
        <Button renderIcon={false} style>
          <AntDesign name={'arrowleft'} color={colors.text} size={18} />
        </Button>
      ),
      headerRight: () => (
        <Button renderIcon={false} style onPress={() => toggleScheme()}>
          <MaterialIcons name={'brightness-6'} size={18} color={colors.text} />
        </Button>
      ),
    });
  }, [isDark])

  const scrollAppointmentToIndex = (item) => {
    appointmentFlatListRef.current.scrollToIndex({
      animated: true,
      index: data.indexOf(item),
      viewPosition: 0.5,
    })
  }

  const toggleScheme = () => {
    isDark ? setScheme('light') : setScheme('dark');
  };

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
            <ButtonCreateAppointment
              setIsAdd={setIsAdd}
              backgroundColor={colors.background}
              textColor={colors.text}
            />
          ))}
        {(isAdd || isClosed) && (
          <CreateAppointment
            loadAdd={loadAdd}
            animationCompleted={animationCompleted}
            isAdd={isAdd}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
            backgroundColor={colors.background}
            textColor={colors.text}
          />
        )}
      </Block>
      {draggingCard && <ButtonDelete setDimensionsButtonDelete={setDimensionsButtonDelete} />}
      <StatusBar
        animated
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Background>
        <Options
          backgroundColor={colors.background}
          textColor={colors.text}
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
                  textColor={colors.text}
                />
              )}
            />
          )}
        />
        <Block flex={0.75}>
          <ScrollView
            scrollEnabled={!draggingCard}
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: theme.sizes.padding * 2,
              paddingHorizontal: theme.sizes.padding,
            }}
          >
            <FlatList
              ref={appointmentFlatListRef}
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
                        index={item2.index}
                        title={item2.title}
                        important={item2.important}
                        hour={item2.hour}
                        address={item2.address}
                        date={item2.date}
                        icon={item2.icon}
                        backgroundColor={colors.background}
                        textColor={colors.text}
                        setDraggingCard={setDraggingCard}
                        dimensionsButtonDelete={dimensionsButtonDelete}
                      />
                    );
                  })}
                </Block>
              )}
              onLayout={(e) => {
                setAppointmentFlatListHeight(e.nativeEvent.layout.height);
              }}
            />
          </ScrollView>
        </Block>
      </Background>
    </Block>
  );
};

export default browser;
