import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  Switch,
  StyleSheet,
} from 'react-native';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../../Redux/todoSlice';
import {todoURL} from '../../API/serverCodes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

//Text Input
const TextIn = props => {
  //if no value is entered in a field and moving to next field => change border color to red for 1.5 second
  const [warningColor, setWarningColor] = useState('#d0d7f5');
  const handleFocus = () => {
    if (!props.value) {
      setWarningColor('#f7adba');
      setTimeout(() => {
        setWarningColor('#d0d7f5');
      }, 1500);
    }
  };

  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor={'#808080'}
      value={props.value}
      onChangeText={props.onChange}
      onBlur={handleFocus}
      style={{
        width: width * 0.95,
        height: 60,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 10,
        backgroundColor: warningColor,
        color: 'blue',
        alignSelf: 'center',
        marginVertical: 10,
      }}
    />
  );
};

//button for date and time picker
const DateTimeBtn = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <TextInput
        placeholder={props.placeholder}
        editable={false}
        placeholderTextColor={
          props.placeholder === 'Select Event Date' ||
          props.placeholder === 'Select Event Time'
            ? '#808080'
            : 'blue'
        }
        // placeholderTextColor={}
        value={props.value}
        onChangeText={props.onChange}
        style={{
          width: width * 0.95,
          height: 60,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 15,
          paddingLeft: 10,
          backgroundColor: '#d0d7f5',
          color: '#000',
          alignSelf: 'center',
          marginVertical: 10,
        }}
      />
    </TouchableOpacity>
  );
};

const AddNewToDo = () => {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [location, setLocation] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const dispatch = useDispatch();

  //date time picker
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [datePlaceHolder, setDatePlaceHolder] = useState('Select Event Date');
  const [timePlaceHolder, setTimePlaceHolder] = useState('Select Event Time');

  const resetFields = () => {
    setEventName('');
    setEventDetails('');
    setLocation('');
    setDatePlaceHolder('Select Event Date');
    setTimePlaceHolder('Select Event Time');
    setIsImportant(false);
  };

  const handleSave = async () => {
    if (
      !eventName ||
      !eventDetails ||
      datePlaceHolder === 'Select Event Date' ||
      timePlaceHolder === 'Select Event Time' ||
      !location
    ) {
      Alert.alert('Blank Fields', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(todoURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          eventDetails,
          date,
          time,
          location,
          isImportant,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Event saved successfully!', [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
        dispatch(fetchTodos());
        resetFields();
      } else {
        Alert.alert('Error', 'Failed to save data');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#FFF'}}>
      {/* date picker  */}
      <DatePicker
        modal
        mode="date"
        open={dateOpen}
        date={date}
        onConfirm={date => {
          setDateOpen(false);
          setDate(date);
          {
            console.log(date);
          }
          setDatePlaceHolder(
            `${date.getDate().toString()} / ${(
              date.getMonth() + 1
            ).toString()} / ${date.getFullYear().toString()}`,
          );
        }}
        onCancel={() => {
          setDateOpen(false);
        }}
      />

      <DatePicker
        modal
        mode="time"
        open={timeOpen}
        date={date} // Assuming 'date' is your state variable for the selected date
        onConfirm={newTime => {
          setTimeOpen(false);

          // Extracting hours and minutes from the time parameter
          const selectedTime = new Date(newTime);
          const hours = selectedTime.getHours();
          const minutes = selectedTime.getMinutes();

          // Updating your state with the selected time
          const newDate = new Date(date); // Creating a new Date object based on the existing date
          newDate.setHours(hours);
          newDate.setMinutes(minutes);

          setDate(newDate);
          setTime(newTime.toString());
          console.log(time);

          setTimePlaceHolder(
            `${hours > 12 ? hours - 12 : hours}:${minutes} ${
              hours > 12 ? 'pm' : 'am'
            }`,
          );
        }}
        onCancel={() => {
          setTimeOpen(false);
        }}
      />

      <KeyboardAvoidingView>
        <TouchableOpacity
          onPress={resetFields}
          style={{alignSelf: 'flex-end', marginHorizontal: 50}}>
          <FontAwesome name="refresh" color={'#1c8bb8'} size={20} />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://img.freepik.com/premium-vector/lettering-modern-hand-written-text-sticker-planner-bright-text-planning-concept-vector-illustration_565728-492.jpg?w=1800',
          }}
          style={{
            width: width * 0.9,
            height: 200,
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: 20,
          }}
          resizeMode="cover"
        />

        <TextIn
          placeholder="Event Name"
          value={eventName}
          onChange={setEventName}
        />
        <TextIn
          placeholder="Event Details"
          value={eventDetails}
          onChange={setEventDetails}
        />

        <TextIn
          placeholder="Location"
          value={location}
          onChange={setLocation}
        />
        {/* <TextIn placeholder="Date" value={date} onChange={setDate} />
        <TextIn placeholder="Time" value={time} onChange={setTime} /> */}

        {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
        <DateTimeBtn
          placeholder={datePlaceHolder}
          onPress={() => setDateOpen(true)}
        />
        <DateTimeBtn
          placeholder={timePlaceHolder}
          onPress={() => setTimeOpen(true)}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginBottom: 20,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: '#37464a',
              fontSize: 17,
              fontFamily: 'Quicksand-SemiBold',
            }}>
            Mark this as an Important Event?:
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isImportant ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsImportant}
            value={isImportant}
          />
        </View>
        <TouchableOpacity onPress={handleSave} style={styles.btn}>
          <Text allowFontScaling={false} style={{color: 'white'}}>
            Save
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1c8bb8',
    height: 50,
    width: width * 0.5,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default AddNewToDo;
