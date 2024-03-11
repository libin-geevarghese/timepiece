import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {fetchTodos} from '../../../Redux/todoSlice';
import {todoURL} from '../../../API/serverCodes';
import {useNavigation} from '@react-navigation/native';

const dobby = require('../../../Asset/Images/no_data_found_dobby.png');

const {width, height} = Dimensions.get('screen');
const iconColor = 'blue';

const TodoList = ({data, navigation}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const iconColor = 'blue';
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const openModal = event => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalVisible(false);
  };

  const deleteEvent = () => {
    if (!selectedEvent) {
      return;
    }

    // Make a DELETE request to your server to delete the event
    fetch(`${todoURL}/${selectedEvent._id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
      })
      .then(() => {
        console.log('Event deleted successfully');
        dispatch(fetchTodos());
        closeModal();
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  const archiveEvent = () => {
    if (!selectedEvent) {
      return;
    }

    // ... (archiveEvent function remains unchanged)
  };

  const EventCard = ({eventName, location, time, date}) => {
    const eventTime = new Date(time);

    // Calculate the time remaining until the event
    const currentTime = new Date();
    const timeRemaining = eventTime - currentTime;

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // State to hold the countdown values
    const [countdown, setCountdown] = useState({days, hours, minutes, seconds});

    // Update the countdown every second
    useEffect(() => {
      const intervalId = setInterval(() => {
        const newTimeRemaining = eventTime - new Date();
        const newDays = Math.floor(newTimeRemaining / (1000 * 60 * 60 * 24));
        const newHours = Math.floor(
          (newTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const newMinutes = Math.floor(
          (newTimeRemaining % (1000 * 60 * 60)) / (1000 * 60),
        );
        const newSeconds = Math.floor((newTimeRemaining % (1000 * 60)) / 1000);

        setCountdown({
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        });
      }, 60000);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }, [eventTime]);

    return (
      <>
        <View style={CardStyles.cardContainer}>
          <Text allowFontScaling={false} style={CardStyles.title}>
            {eventName}
          </Text>
          <View style={CardStyles.iconAndTextBindingWrapper}>
            <Icon name="location-outline" size={20} color={iconColor} />
            <Text allowFontScaling={false} style={CardStyles.cardText}>
              {location}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20}}>
            <View style={CardStyles.iconAndTextBindingWrapper}>
              <Icon name="calendar-outline" size={20} color={iconColor} />
              <Text allowFontScaling={false} style={CardStyles.cardText}>
                {new Date(date).toDateString()}
              </Text>
            </View>
            <View style={CardStyles.iconAndTextBindingWrapper}>
              <Icon name="time-outline" size={20} color={iconColor} />
              <Text allowFontScaling={false} style={CardStyles.cardText}>
                {new Date(time).toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <Text allowFontScaling={false} style={CardStyles.cardText}>
            {countdown.days} Days {countdown.hours} Hours {countdown.minutes}
            Minutes Left
          </Text>
        </View>
      </>
    );
  };

  const CardStyles = StyleSheet.create({
    cardContainer: {
      gap: 10,
      width: width * 0.95,
      height: 160,
      borderRadius: 15,
      backgroundColor: '#F5F5F5',
      elevation: 5,
      marginVertical: 12,
      padding: 15,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    title: {fontSize: 20, fontWeight: 'bold', color: '#333'},
    cardText: {
      fontSize: 16,
      color: '#667',
      marginLeft: 5,
      fontFamily: 'Quicksand-Medium',
    },
    iconAndTextBindingWrapper: {flexDirection: 'row', alignItems: 'center'},
  });

  return (
    <>
      {data && data.length >= 1 ? (
        <>
          <FlatList
            data={data}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <EventCard
                  eventName={
                    item.eventName ? item.eventName : 'unable to fetch data'
                  }
                  location={item.location ? item.location : ''}
                  time={item.time ? item.time : ''}
                  date={item.date ? item.date : ''}
                />
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <Image
            source={dobby}
            style={{
              alignSelf: 'center',
              width: 300,
              height: 300,
              marginTop: height * 0.1,
            }}
          />
          <View
            style={{
              alignSelf: 'center',
              flexWrap: 'wrap',
            }}>
            <Text style={styles.noDataText}>Sorry No Events Found. </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Add New Event');
                // navigation.goBack();
              }}>
              <Text style={styles.noDataAddText}>Add New Events?</Text>
            </Pressable>
          </View>
        </>
      )}
      {/* Modal for Event Details */}

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{selectedEvent?.eventName}</Text>
          <Text style={styles.subtitle}>{selectedEvent?.time}</Text>
          <Text style={styles.body}>{selectedEvent?.eventDetails}</Text>

          {/* Buttons for Archive , Edit and Delete */}
          <View style={styles.buttonContainer}>
            {/* Close modal button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Icon name="close" size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteEvent}>
              <Icon name="trash-outline" size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.archiveButton}
              onPress={archiveEvent}>
              <Icon name="archive-outline" size={30} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                return;
              }}>
              <Icon name="create-outline" size={30} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  archiveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#999',
    padding: 10,
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Quicksand-Medium',
  },
  noDataText: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: 'black',
  },
  noDataAddText: {
    color: 'blue',
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    textDecorationLine: 'underline',
  },
});

export default TodoList;
