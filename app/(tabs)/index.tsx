import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [formData, setFormData] = useState({
    user_type:"researcher",
    first_name:"",
    last_name:"",
    username:"",
    email:"",
    country:"United States",
    password:""
  })
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const handleSignUp = async () => {
    setLoading(true);
    try{ 
      const response = await fetch('https://django-dev.aakscience.com/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error signing up');
      }
      const data = await response.json();
      console.log('Sign Up Successful:', data);
      Alert.alert('Sign Up Successful', 'You have successfully signed up!');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput 
        style={styles.input}
        placeholder="First Name"
        value={formData.first_name}
        onChangeText={(value) => handleInputChange('first_name', value)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Last Name"
        value={formData.last_name}
        onChangeText={(value) => handleInputChange('last_name', value)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <Button 
        title={loading ? "Signing Up..." : " Sign Up "}
        onPress={handleSignUp}
        disabled={loading}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    width: '80%', 
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
