import React, { createContext, useState, useContext } from 'react';

// Create a new context for managing current conversation data
const CurrentConversationContext = createContext();

// Create a provider component to manage the current conversation data
export const CurrentConversationProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState(null);

  return (
    <CurrentConversationContext.Provider value={{ currentConversation, setCurrentConversation }}>
      {children}
    </CurrentConversationContext.Provider>
  );
};

// Custom hook to access the current conversation data
export const useCurrentConversation = () => {
  return useContext(CurrentConversationContext);
};
