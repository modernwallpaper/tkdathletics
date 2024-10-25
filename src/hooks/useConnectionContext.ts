import { ConnectionContext } from "@/context/connection.context";
import { useContext } from "react";

export const useConnection = () => {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error(
      "Connection context must be used inside of a connection context provider",
    );
  }

  return context;
};
