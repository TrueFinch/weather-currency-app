import React from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { weatherGroups } from '../utils/utils'

export default class WeatherComponent extends React.Component {
  // state = {
  //   data: null,
  // };

  constructor(props) {
    super();
    this.data = props.data;
    console.log(this.data);
  }

  render() {
    console.log(typeof(this.data.date));
    const weekDay = new Array("Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",);
    const month = new Array("Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",)
    const url = `http://openweathermap.org/img/wn/${this.data.iconID}@2x.png`;
    const temp = `${this.data.curT === null ? `${this.data.minT}/${this.data.maxT}` : `${this.data.curT}`}°C`
    const forecast = `${weatherGroups.get(this.data.group).title}: ${this.data.desc}`;
    return (
      <View style={styles.weatherComponent}>
        <View style={styles.dateContainer}>
          <Text style={styles.weekDayText} >{weekDay[this.data.date.getDay()]}</Text>
          <Text style={styles.dateMonthText} >{this.data.date.getDate()} {month[this.data.date.getMonth()]}</Text>
        </View>
        <View style={styles.imageContainer}>
        <Image
          style={styles.weatherIcon}
          source={{uri: url}}
        />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.tempretureText}>{temp}</Text>
          <Text style={styles.forecastText}>{forecast}</Text>
          <Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherComponent: {
    flexDirection: 'row',
    // height: 101,
    justifyContent: 'space-between',
    // backgroundColor: '#00BCD4',
  },
  dateContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  imageContainer: {
    flex: 2,
    width: 100,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: '#00BCD2',
  },
  weekDayText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  dateMonthText: {
    fontSize: 15,
    fontStyle: 'italic'
  },
  tempretureText: {
    fontSize: 28,
    fontWeight: '550'
  },
  forecastText: {
    fontSize: 15,
    fontStyle: 'italic'
  },
  weatherIcon: {
    width: 100,
    height: 100,
  }
});