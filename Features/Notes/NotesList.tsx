// NotesList.js
import React, {useEffect} from 'react';
import {View, Button, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNotes} from '../../Redux/notesSlice';
import NotesCard from './NotesCard';
import AddNotes from './AddNotes';

const NotesList = () => {
  const dispatch = useDispatch();
  const {notesData, notesLoading, notesLoadingError} = useSelector(
    state => state.notes,
  );

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDeleteNote = async noteId => {
    try {
      await fetch(`https://mytestdomain.online/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      dispatch(fetchNotes());
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleSaveNote = async newNote => {
    try {
      const response = await fetch('https://mytestdomain.online/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: newNote,
        }),
      });

      if (response.ok) {
        console.log('Note saved:', newNote);
        // Refresh the notes list after saving
        dispatch(fetchNotes());
      } else {
        console.error('Failed to save note:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving note:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AddNotes onSave={handleSaveNote} />

      <ScrollView>
        {notesData &&
          notesData.length > 0 &&
          notesData.map(note => (
            <NotesCard
              key={note._id}
              id={note._id}
              notes={note.note}
              onDelete={handleDeleteNote}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
});

export default NotesList;
