'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSession } from 'next-auth/react';
import { setUser, clearUser } from './slices/userSlice';

interface ReduxProviderProps {
  children: ReactNode;
}

// Inner component to access NextAuth session
function SyncAuth({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // When user is authenticated, update Redux store
      store.dispatch(setUser({
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || undefined,
        role: session.user.role || 'user',
      }));
    } else if (status === 'unauthenticated') {
      // When user is not authenticated, clear user state
      store.dispatch(clearUser());
    }
  }, [session, status]);
  
  return <>{children}</>;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <SyncAuth>{children}</SyncAuth>
    </Provider>
  );
} 