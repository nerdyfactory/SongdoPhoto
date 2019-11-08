/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { Spacer, BasicButton } from '../Shared';
import { Styles, Colors } from '../../theme';
import { useMessage } from '../../contexts/MessageContext';

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useMessage();
  const onSubmit = () => {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setMessage({
          messageText: 'The account was created',
        });
        navigation.navigate('App');
      })
      .catch(e => {
        console.log(e);
        setMessage({
          messageType: 'error',
          messageText: e.message,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subTitle}>Nice to meet you</Text>
        <Spacer />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          returnKeyType="next"
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setPassword}
          onSubmitEditing={onSubmit}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry={true}
          style={styles.input}
        />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
      </View>
      <Spacer />
      <BasicButton onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </BasicButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...(Styles.container as object),
    backgroundColor: Colors.white,
  },
  content: {
    flex: 4,
    marginHorizontal: Styles.widthRatio(0.15),
  },
  title: {
    fontSize: 50,
  },
  subTitle: {
    fontSize: 20,
  },
  input: {
    marginBottom: 9,
    fontSize: 14,
    padding: 5,
    backgroundColor: Colors.paleGrey,
  },
  button: {
    ...(Styles.alignCenter as object),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    backgroundColor: Colors.windowsBlue,
  },
  createAccountText: {
    fontSize: 14,
  },
  buttonText: {
    color: Colors.white,
  },
});
