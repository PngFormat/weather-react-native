import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButtonComponent = ({ title = 'Back', style, textStyle }: any) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.goBack()}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BackButtonComponent;
