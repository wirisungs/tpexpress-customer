import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(true);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(true);

  return (
    <NotificationContext.Provider 
      value={{ 
        isPushNotificationEnabled, 
        setIsPushNotificationEnabled, 
        isEmailNotificationEnabled,
        setIsEmailNotificationEnabled 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
