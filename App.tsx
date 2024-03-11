import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'furkankaya-react-native-splash-screen';

import store from './Redux/store';

import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';

//importing all main featurese screen
import Routines from './Features/Future Development/Routines/Routines';
import Budget from './/Features/Future Development/Budget/Budget';
import Weather from './/Features/Future Development/Weather/Weather';
import Calendar from './Features/Future Development/Calender/Calendar';
import Reminder from './Features/Future Development/Reminder/Reminder';
import ToDoHome from './Features/ToDo/ToDoHome';
import AllToDo from './Features/ToDo/AllToDo';
import AddNewToDo from './Features/ToDo/AddNewToDo';

//Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Locations from './Features/Locations/Locations';
import TodoFiltered from './Features/ToDo/TodoFiltered';
import NotesList from './Features/Notes/NotesList';
import AddNewNote from './Features/Notes/AddNotes';
import AddNotes from './Features/Notes/AddNotes';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//My Todo
//TodoStacks
const ToDoStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My ToDo"
        component={ToDoHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Filtered Todo"
        component={TodoFiltered}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//integrating all the stacks to main drawer page of Todo
const ToDoDrawerScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ToDoStacks}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="home" size={20} color={'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name="All Events"
        component={AllToDo}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="tray-full" size={20} color={'blue'} />
          ),
        }}
      />
      <Tab.Screen
        name="Add New Event"
        component={AddNewToDo}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo name="add-to-list" size={20} color={'blue'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
//Routines
//Budget
//Weather
//Calender
//Notes

const NotesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotesList"
        component={NotesList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddNewNote"
        component={AddNotes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

//Reminders

//Main App ==> Integrating all features screen to Drawer Navigations

//use effect function to hide splash screen on loading
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="ToDo">
          <Drawer.Screen name="Events" component={ToDoDrawerScreen} />
          <Drawer.Screen name="Routines" component={Routines} />
          <Drawer.Screen name="Budget" component={Budget} />
          <Drawer.Screen name="Weather" component={Weather} />
          <Drawer.Screen name="Calender" component={Calendar} />
          <Drawer.Screen name="Notes" component={NotesStack} />
          <Drawer.Screen name="Reminders" component={Reminder} />
          <Drawer.Screen name="Locations" component={Locations} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
