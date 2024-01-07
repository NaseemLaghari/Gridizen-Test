import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import formData from '../assets/form-data.json'
import { useDispatch } from 'react-redux';
import { setEmail, setName } from '../Redux/formReducer';
import { setItem } from '../Storage/localStorage'

const FormScreen = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  
  
  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    let requiredName = (formValues?.firstName == undefined || formValues?.firstName == "")? "Name": "";
    let requiredEmail = (formValues?.email == undefined || formValues?.email == "")? "Email": ""
    
    if((formValues?.email == undefined || formValues?.email == "") || (formValues?.firstName == undefined || formValues?.firstName == "") ){
      let combine = `${requiredName + `${requiredName && " and "}`} ${requiredEmail}`
      alert(`${combine} is required`);
      return;
    }else {
      storeDataInLocal(formValues.firstName, formValues.email)
      dispatch( setEmail(formValues.email) )
      dispatch( setName(formValues.firstName) )
    }
  };


  const storeDataInLocal = (name, email) => {
    setItem("@name", name);
    setItem("@email", email);

  }


  return (
    <View style={styles.container}>
      {formData.map((field) => (
        <View key={field.name} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={formValues[field.name] || ''}
            onChangeText={(value) => handleInputChange(field.name, value)}
            placeholder={`Enter ${field.label}`}
            keyboardType={field.type === 'email' ? 'email-address' : 'default'}
          />
        </View>
      ))}
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

export default FormScreen;
