import { createContext, useState } from "react";

const Context = createContext();

function NotificationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Context.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </Context.Provider>
  );
}

export default NotificationProvider;
