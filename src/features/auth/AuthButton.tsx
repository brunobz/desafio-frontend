import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../auth/authSlice';
import type { RootState } from '../../store/store';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
  picture: string;
}

export const AuthButton: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      dispatch(setToken(accessToken));

      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(res.data);
        localStorage.setItem('yt_user', JSON.stringify(res.data));
      } catch (err) {
        console.error('Error fetching user info', err);
      }
    },
    scope:
      'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile',
  });

  const logout = () => {
    dispatch(setToken(null));
    setUser(null);
    localStorage.removeItem('yt_user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('yt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex items-center">
      {token && user ? (
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
            {user.name}
          </span>
          <span
            onClick={logout}
            className="text-red-500 text-sm font-semibold underline underline-offset-2 cursor-pointer hover:text-red-600 hover:underline-offset-4 transition-all duration-150"
            aria-label="Logout"
          >
            Logout
          </span>
        </div>
      ) : (
        <button
          onClick={() => login()}
          className="border border-red-500 text-red-500 bg-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-50 transition"
          aria-label="Login with YouTube"
        >
          Login
        </button>
      )}
    </div>
  );
};
