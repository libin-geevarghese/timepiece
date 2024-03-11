import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import TodoList from './Components/TodoList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos} from '../../Redux/todoSlice';

const AllToDo = () => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <ActivityIndicator size="large" />
        <Text>...Loading</Text>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Text>ERROR</Text>
        <Text>{error}</Text>
      </>
    );
  }

  return (
    <View>
      <TodoList data={data} />
    </View>
  );
};

export default AllToDo;

const styles = StyleSheet.create({});
