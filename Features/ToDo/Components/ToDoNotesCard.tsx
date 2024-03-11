import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
const windowWidth = Dimensions.get('window').width;

const ToDoNotesCard = ({notes}) => {
  // Function to truncate notes to 100 characters and add ellipsis
  const trimmedNotes = text => {
    return text.length > 35 ? text.substring(0, 35) + '...' : text;
  };

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.textStyle}>
        {trimmedNotes(notes)}
      </Text>
    </View>
  );
};

export default ToDoNotesCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 40,
    minHeight: 100,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Roboto', // Updated font family
    lineHeight: 24, // Adjusted line height for better readability
  },
});
