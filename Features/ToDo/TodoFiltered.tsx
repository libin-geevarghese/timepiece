import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchTodos} from '../../Redux/todoSlice';
import {useDispatch, useSelector} from 'react-redux';

const TodoFiltered = ({route, navigation}) => {
  const {
    todayData,
    tommorowData,
    thisWeekData,
    thisMonthData,
    missedData,
    archievedData,
    importantData,
    loading,
    error,
  } = useSelector(state => state.todos);
  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <>
        <Text>ERROR</Text>
        <Text>{error}</Text>
      </>
    );
  }

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, [dispatch]);

  let filteredData;
  const filter = route.params.filter;
  console.log(filter);

  filter === 'important'
    ? (filteredData = importantData)
    : filter === 'today'
    ? (filteredData = todayData)
    : filter === 'tomorrow'
    ? (filteredData = tommorowData)
    : filter === 'week'
    ? (filteredData = thisWeekData)
    : filter === 'month'
    ? (filteredData = thisMonthData)
    : filter === 'missed'
    ? (filteredData = missedData)
    : filter === 'archieve'
    ? (filteredData = archievedData)
    : [];

  return (
    <View>
      <View style={{flexDirection: 'row', gap: 80}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 20}}>
          <Ionicons name="arrow-back" size={28} color={'black'} />
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 18,
            alignSelf: 'center',
            color: '#374042',
            fontFamily: 'Montserrat-ExtraBold',
          }}>
          {filter === 'important'
            ? 'Important Events'
            : filter === 'today'
            ? 'Today'
            : filter === 'tomorrow'
            ? 'Tommorow'
            : filter === 'week'
            ? 'This Week'
            : filter === 'month'
            ? 'This Month '
            : filter === 'missed'
            ? 'Missed Events'
            : filter === 'archieve'
            ? 'Archieved Events'
            : 'n/a'}
        </Text>
      </View>
      <TodoList data={filteredData} navigation={navigation} />
    </View>
  );
};

export default TodoFiltered;

const styles = StyleSheet.create({});
