import { createContext, useContext, useReducer, useEffect } from 'react';
import { userReducer } from './reducer';
import { fetchUserScores } from './services';
import { UserState, UserContextType } from './types';

const initialState: UserState = {
  profile: null,
  scores: {
    status: 'idle',
    scores: [],
    error: null,
  },
};

const UserContext = createContext<UserContextType>({
  user: initialState,
  dispatchUser: () => undefined,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, dispatchUser] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (user.scores.status === 'idle' && user.profile) {
      fetchUserScores(dispatchUser, user.profile?._id);
    }
  }, [user.profile]);

  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  return useContext(UserContext);
}
