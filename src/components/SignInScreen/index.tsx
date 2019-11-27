/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import Firebase from '../../services/Firebase';

import { Spacer, BasicButton } from '../Shared';
import { Styles, Colors } from '../../theme';
import { useMessage } from '../../contexts/MessageContext';

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setMessage] = useMessage();
  const onSubmit = () => {
    return Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => navigation.navigate('App'))
      .catch(e => {
        setMessage({
          messageType: 'error',
          messageText: e.message,
        });
        console.log(e);
      });
  };
  const onNavigate = () => navigation.navigate('SignUp');
  return (
    <SafeAreaView style={styles.container}>
      <Spacer />
      <View style={styles.content}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subTitle}>Good to see you again</Text>
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
        <BasicButton onPress={onNavigate}>
          <Text style={styles.createAccountText}>I don't have an account</Text>
        </BasicButton>
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
