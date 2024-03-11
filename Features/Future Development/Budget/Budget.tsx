import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Budget = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => setUserData(data.results[0]))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  const {name, location, email, phone, picture} = userData;

  return (
    <View style={styles.container}>
      <Image source={{uri: picture.large}} style={styles.profileImage} />
      <Text
        style={styles.name}>{`${name.title} ${name.first} ${name.last}`}</Text>
      <Text style={styles.details}>{`Email: ${email}`}</Text>
      <Text style={styles.details}>{`Phone: ${phone}`}</Text>
      <Text
        style={
          styles.details
        }>{`Location: ${location.city}, ${location.state}, ${location.country}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Budget;
