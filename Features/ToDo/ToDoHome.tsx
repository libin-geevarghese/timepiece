// ToDoHome.js
import React, {useEffect} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../../Redux/todoSlice';
import {fetchNotes} from '../../Redux/notesSlice';
import CountSquareBoxes from './Components/CountSquareBoxes';
import TodoWeatherCard from './Components/TodoWeatherCard';
import ToDoNotesCard from './Components/ToDoNotesCard';
import DonutGraph from '../../global Components/DonutGraph';

const ToDoHome = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    data,
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
  const {notesData, notesLoading, notesLoadingError} = useSelector(
    state => state.notes,
  );

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchNotes());
  }, [dispatch]);

  if (loading || notesLoading) {
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
  if (notesLoadingError) {
    console.log({error});
  }
  console.log(notesData);
  return (
    <>
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CountSquareBoxes
            count={importantData ? importantData.length : 0}
            type={'Important'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'important'})
            }
          />
          <CountSquareBoxes
            count={todayData ? todayData.length : 0}
            type={'Today'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'today'})
            }
          />
          <CountSquareBoxes
            count={tommorowData ? tommorowData.length : 0}
            type={'Tomorrow'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'tomorrow'})
            }
          />
          <CountSquareBoxes
            count={thisWeekData ? thisWeekData.length : 0}
            type={'This Week'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'week'})
            }
          />
          <CountSquareBoxes
            count={thisMonthData ? thisMonthData.length : 0}
            type={'this month'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'month'})
            }
          />
          <CountSquareBoxes
            count={missedData ? missedData.length : 0}
            type={'Missed'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'missed'})
            }
          />
          <CountSquareBoxes
            count={archievedData ? archievedData.length : 0}
            type={'Archieved'}
            onPress={() =>
              navigation.navigate('Filtered Todo', {filter: 'archieve'})
            }
          />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 15,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 20,
                color: '#13282B',
              }}>
              Routines
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('Routines');
            }}>
            <DonutGraph totalCount={4} completed={2} />
          </Pressable>
        </View>

        <ScrollView horizontal={true}>
          <TodoWeatherCard />
          <TodoWeatherCard />
          <TodoWeatherCard />
          <TodoWeatherCard />
          <TodoWeatherCard />
        </ScrollView>

        <>
          {notesLoading ? (
            <Text>Loading...</Text>
          ) : notesLoadingError ? (
            <Text>Error: {notesLoadingError}</Text>
          ) : notesData && notesData.length >= 1 ? (
            <FlatList
              horizontal={true}
              data={notesData}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <ToDoNotesCard id={item._id} notes={item.note} />
              )}
            />
          ) : (
            <ToDoNotesCard notes={'No Notes Found'} />
          )}
        </>
      </ScrollView>
    </>
  );
};

export default ToDoHome;
