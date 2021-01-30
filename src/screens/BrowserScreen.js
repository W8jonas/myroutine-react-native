import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StatusBar } from 'react-native';
import { Background, Options, Item, Card } from '../components';
import { theme } from '../constants';
import { Block, Button } from '../elements';
import { data } from '../utils';

const browser = () => {
  
  const [selectedOrigin, setSelectedOrigin] = useState(1);
  const [selected, setSelected] = useState(selectedOrigin);

  return (
    <Block>
      <Block
        style={{ bottom: 0, alignSelf: 'flex-end' }}
        index={2}
        center
        middle
        absolute
        width={100}
        height={100}
      >
        <Button
          shadow
          style={{ 
            backgroundColor: theme.colors.white, 
            height: 60, 
            width: 60, 
            borderRadius: theme.sizes.radius * 2,
            justifyContent: 'center',
            alignItems: 'center' 
          }}
          renderIcon={false}
        >
          <MaterialIcons
            name="playlist-add"
            size={24}
            color={theme.colors.black}
          />
        </Button>
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
