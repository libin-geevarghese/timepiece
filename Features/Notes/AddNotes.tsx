import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

const AddNotes = ({onSave}) => {
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    if (note.trim() !== '') {
      onSave(note);
      setNote('');
    } else {
      Alert.alert('Error', 'Note cannot be empty.', [{text: 'OK'}]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        allowFontScaling={false}
        style={styles.input}
        placeholder="Enter a new note..."
        placeholderTextColor="#6c757d"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
        <Text allowFontScaling={false} style={styles.buttonText}>
          Save Note
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 15,
    fontSize: 18,
    borderRadius: 25,
    color: '#495057',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddNotes;
