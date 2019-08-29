/**
 * @format
 */
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';
import firebase, { RNFirebase } from 'react-native-firebase';

type AuthContextValue = [RNFirebase.User, Dispatch<any>];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setAuth(user || {});
    });
  });

  const value = useMemo<AuthContextValue>(() => [auth, setAuth], [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
