import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    try {
      const storedUserId = localStorage.getItem('userId');
      return storedUserId ? JSON.parse(storedUserId) : null;
    } catch (error) {
      console.error('Error retrieving userId from storage:', error);
      return null;
    }
  });

  const [emailId, setEmailId] = useState(async() => {
    try {
      const storedEmailId = localStorage.getItem('emailId');
      return storedEmailId ? JSON.parse(storedEmailId) : null;
    } catch (error) {
      console.error('Error retrieving emailId from storage:', error);
      return null;
    }
  });

  // useEffect(() => {
  //   try {
  //     localStorage.setItem('userId', JSON.stringify(userId));
  //   } catch (error) {
  //     console.error('Error storing userId in storage:', error);
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem('emailId', JSON.stringify(emailId));
  //   } catch (error) {
  //     console.error('Error storing emailId in storage:', error);
  //   }
  // }, []);

  const clearUserData = () => {
    try {
      localStorage.removeItem('userId');
      localStorage.removeItem('emailId');
      setUserId(null);
      setEmailId(null);
      // Additional cleanup logic if needed
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userId: userId, setUserId, emailId: emailId, setEmailId, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
