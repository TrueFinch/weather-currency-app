import React from 'react';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';

export default class About extends React.Component {
  state = {
    isLoading: true,
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/cat.jpg')} />
        <Text style={styles.descriptionText}>
          <p>Приложение с прогнозом погоды и курсом биткоина к рублю</p>
          <p>Создал студент группы M9120-09.04.01иибд — Глушков Владимир</p>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b9b7bd',
  },
  logo: {
    height: 128,
    width: 128,
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: 20
  }
});
