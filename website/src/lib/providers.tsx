"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { useSession } from "next-auth/react";
import { setUser, clearUser } from "./slices/userSlice";
import { PersistGate } from "redux-persist/integration/react";

interface ReduxProviderProps {
  children: ReactNode;
}

// Inner component to sync NextAuth session with Redux
function SyncAuth({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      store.dispatch(
        setUser({
          id: session.user.id,
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || undefined,
          role: session.user.role || "user",
        })
      );
    } else if (status === "unauthenticated") {
      store.dispatch(clearUser());
    }
  }, [session, status]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        }
        persistor={persistor}
      >
        <SyncAuth>{children}</SyncAuth>
      </PersistGate>
    </Provider>
  );
}
