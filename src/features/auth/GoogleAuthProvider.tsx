import { GoogleOAuthProvider } from '@react-oauth/google';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const GoogleAuthProvider = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};
