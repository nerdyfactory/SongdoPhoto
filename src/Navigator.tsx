/*
 * @format
 */

import {
  createSwitchNavigator,
  createAppContainer,
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MapScreen from './components/MapScreen';
import PhotoScreen from './components/PhotoScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import AuthLoadingScreen from './components/AuthLoadingScreen';

const AppStack = createStackNavigator(
  { Map: MapScreen, Photo: PhotoScreen },
  {
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
  },
);
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
});

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export interface PropsWithNavigation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default Navigator;
