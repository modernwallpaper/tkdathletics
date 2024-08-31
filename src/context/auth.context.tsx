import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { loadUser } from "@/lib/indexedDB";
import { User } from "@/types";

// Define the shape of the state object
interface AuthState {
  user: User | null;
}

// Define the shape of the action object
type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Create the AuthContext with the proper types
interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Define the props for the AuthContextProvider component
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const [loading, setLoading] = useState<true | false>(true);

  useEffect(() => {
    async function checkForUser() {
      setLoading(true);
      const userInfo = localStorage.getItem("user");
      if (userInfo) {
        const userLocal = JSON.parse(userInfo);
        const { id } = userLocal;
        if (id) {
          const user = await loadUser(id);
          if (user) {
            setLoading(false);
            dispatch({ type: "LOGIN", payload: user });
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    checkForUser();
  }, [dispatch, setLoading]);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
