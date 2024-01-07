import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../Redux/postsDataReducer';
import { useNavigation } from '@react-navigation/native';

const AddPostScreen = () => {
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState({
    title: '',
    body: '',
    userId: 1, 
  });
  const {data} = useSelector(state => state.postsData)
  const navigation = useNavigation();
  const handleSubmit = () => {
    if(postValues.title && postValues.body){
        dispatch( setData([...data, {...postValues, id: data?.length+2}]));
        navigation.goBack()
    }else {
        alert("Fill all missing fields")
    }
  };


  const storeDataInLocal = (name, email) => {
    
  }


  return (
    <View style={styles.container}>
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={postValues.title}
                onChangeText={(value) => setPostValues({...postValues, title: value})}
                placeholder={`Enter title`}
            />
        </View>
        <View style={styles.fieldContainer}>
            <Text style={styles.label}>Body</Text>
            <TextInput
                style={styles.input}
                value={postValues.body}
                onChangeText={(value) => setPostValues({...postValues, body: value})}
                placeholder={`Enter body`}
            />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff9',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddPostScreen;
