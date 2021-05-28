import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import { weatherData, WeatherData } from '../utils/utils'
import WeatherComponent from '../components/WeatherComponent'
import { AntDesign } from '@expo/vector-icons';

export default class Home extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    // only for debug
    // var currDate = new Date();
    // let debugData = new WeatherData(currDate, 27.5, 25.6, 27.5, 54, 6, "Rain", "light rain", "10n");
    //
    console.log(weatherData.btcToRubCurrency);
    return (
      <View style={styles.homeScreenMainView}>
        <WeatherComponent
          data={ weatherData.today }
          // data={ debugData }
          />
        <View style={styles.currencyHandler}>
          <Text style={styles.currencyText}>1 Bitcoin   </Text>
          <AntDesign name="arrowright" size={24} color="black" />
          <Text style={styles.currencyText}>   {weatherData.btcToRubCurrency} рублей</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeScreenMainView: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#b9b7bd'
  },
  currencyHandler: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  currencyText: {
    fontSize: 20
  }
});