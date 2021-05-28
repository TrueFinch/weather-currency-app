import React from 'react';
import { StyleSheet, Text, View, Animated, FlatList } from 'react-native';
import { weatherData, WeatherData } from '../utils/utils'
import WeatherComponent from '../components/WeatherComponent'

export default class Week extends React.Component {
  render() {
    // let debugData = []
    // for (let i = 0; i < 7; ++i) {
    // var currDate = new Date();
    // currDate.setDate(currDate.getDate() + i);
    //   debugData.push(new WeatherData(currDate, 27.5, 25.6, 27.5, 54, 6, "Rain", "light rain", "10n"));
    // }
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <WeatherComponent
          data = { item }
        />
      </View>
    );
    return (  
      <FlatList 
        style={styles.weekScreenMainView}
        data = { weatherData.forecast }
        // data = { debugData }
        renderItem = { renderItem }
        keyExtractor = { item => item.id }
        ItemSeparatorComponent={() => (
          <View style={styles.separator}></View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  weekScreenMainView: {
    backgroundColor: '#b9b7bd'
  },
  item: {
    marginVertical: 1,
    marginHorizontal: 16,
  },
  separator: {
    alignSelf: "center",
    height: 1,
    width: "75%",
    backgroundColor: "grey",
  }
});