// import {StyleSheet, Text, View, Dimensions} from 'react-native';
// import React from 'react';
// const windowWidth = Dimensions.get('window').width;

// const TodoWeatherCard = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={{fontSize: 22}}> Kochi</Text>
//       <Text style={{fontSize: 22}}>Clear Sky</Text>
//       <Text style={{fontSize: 22}}> Temp : 29 c</Text>
//       <Text style={{fontSize: 22}}>Min/Max : 27c/30c </Text>
//       <Text style={{fontSize: 22}}>Feels Like : 30 c</Text>
//       <Text style={{fontSize: 22}}>Humidity : 79 %</Text>
//     </View>
//   );
// };

// export default TodoWeatherCard;

// const styles = StyleSheet.create({
//   container: {
//     width: windowWidth / 1.3,
//     height: windowWidth / 1.4,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginHorizontal: 7,
//     marginVertical: 15,
//     elevation: 8,
//   },
// });

import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;

const TodoWeatherCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text allowFontScaling={false} style={styles.city}>
          Kochi
        </Text>
        <Text allowFontScaling={false} style={styles.otherText}>
          Clear Sky
        </Text>
      </View>
      <View style={styles.body}>
        <Text allowFontScaling={false} style={styles.temperature}>
          29°C
        </Text>
        <Text allowFontScaling={false} style={styles.otherText}>
          Min/Max : 27°C / 30°C
        </Text>
      </View>
      <View style={styles.footer}>
        <Text allowFontScaling={false} style={styles.otherText}>
          Feels like 30°C
        </Text>
        <Text allowFontScaling={false} style={styles.otherText}>
          Humidity: 79%
        </Text>
      </View>
    </View>
  );
};

export default TodoWeatherCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.72,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  city: {
    fontSize: 25,
    color: '#252c2e',
    fontFamily: 'Quicksand-Bold',
  },

  body: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#252c2e',
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },

  otherText: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'Quicksand-Medium',
  },
});
