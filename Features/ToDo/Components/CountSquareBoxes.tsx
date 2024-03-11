import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;

const CountSquareBoxes = props => {
  //   const {width, height}
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text
        allowFontScaling={false}
        style={{fontSize: 35, fontFamily: 'Quicksand-Bold', color: 'white'}}>
        {props.count}
      </Text>
      <Text
        allowFontScaling={false}
        style={{fontSize: 20, fontFamily: 'Quicksand-Bold', color: 'white'}}>
        {props.type}
      </Text>
    </TouchableOpacity>
  );
};

export default CountSquareBoxes;

const styles = StyleSheet.create({
  container: {
    height: windowWidth / 3,
    width: windowWidth / 3,
    backgroundColor: '#055256',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    marginVertical: 10,
    borderRadius: 30,
  },
});
