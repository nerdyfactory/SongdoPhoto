/**
 * @format
 */
import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

interface Message {
  messageType?: 'error' | 'warning' | 'error';
  messageText: string;
}

type MessageContextValue = [Message, Dispatch<any>];

const MessageContext = createContext<MessageContextValue | undefined>(
  undefined,
);

function useMessage(): MessageContextValue {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error(`useMessage must be used within a MessageProvider`);
  }
  return context;
}

interface Props {
  children: ReactNode;
}

function MessageProvider({ children }: Props) {
  const [message, setMessage] = useState();

  const value = useMemo<MessageContextValue>(() => [message, setMessage], [
    message,
  ]);

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}

export { MessageProvider, useMessage };
