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
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuthContextValue = [FirebaseAuthTypes.User, Dispatch<any>];

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
  const [currentUser, setUser] = useState();

  useEffect(() => {
    return auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      setUser(user || {});
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => [currentUser, setUser], [
    currentUser,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
