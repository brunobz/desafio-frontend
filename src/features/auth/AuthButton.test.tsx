import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import type { MockedFunction } from 'vitest';
import { AuthButton } from './AuthButton';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

vi.mock('@react-oauth/google', async () => {
  const actual = await vi.importActual<typeof import('@react-oauth/google')>('@react-oauth/google');
  return {
    ...actual,
    useGoogleLogin: vi.fn(),
  };
});

vi.mock('axios');

const mockDispatch = vi.fn();
(useDispatch as MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);

const mockLogin = vi.fn();
(useGoogleLogin as MockedFunction<typeof useGoogleLogin>).mockReturnValue(mockLogin);

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('AuthButton', () => {
  it('renders login button when no token', () => {
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue(null);

    render(<AuthButton />);
    const loginButton = screen.getByRole('button', { name: /login with youtube/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('calls login function when login button clicked', () => {
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue(null);

    render(<AuthButton />);
    const loginButton = screen.getByRole('button', { name: /login with youtube/i });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalled();
  });

  it('renders user name and logout when token and user exist', () => {
    const mockUser = { name: 'John Doe', picture: 'pic.jpg' };
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue('fake-token');
    localStorage.setItem('yt_user', JSON.stringify(mockUser));

    render(<AuthButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    const logoutBtn = screen.getByText('Logout');
    expect(logoutBtn).toBeInTheDocument();
  });

  it('calls logout and clears user and token', () => {
    const mockUser = { name: 'John Doe', picture: 'pic.jpg' };
    (useSelector as MockedFunction<typeof useSelector>).mockReturnValue('fake-token');
    localStorage.setItem('yt_user', JSON.stringify(mockUser));

    render(<AuthButton />);

    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'auth/setToken', payload: null });
    expect(localStorage.getItem('yt_user')).toBeNull();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
