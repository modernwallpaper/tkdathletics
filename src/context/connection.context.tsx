import React, { createContext, useState, useEffect } from "react";

interface ConnectionContextType {
  isOnline: boolean;
}

export const ConnectionContext = createContext<
  ConnectionContextType | undefined
>(undefined);

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  console.log("online: ", isOnline);

  return (
    <ConnectionContext.Provider value={{ isOnline }}>
      {children}
    </ConnectionContext.Provider>
  );
};
