'use client';

import { FC, KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';

export const testID = {
  container: 'Header',
  userWelcome: 'Header--welcome',
  logoutBtn: 'Header--logoutBtn',
  loginBtn: 'Header--loginBtn',
  nameInput: 'Header--nameInput',
};

type Props = {
  user?: User;
  onLogin?: (name: string) => void;
  onLogout?: () => void;
};

const Header: FC<Props> = ({ user, onLogin, onLogout }) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');

  const onUsernameChange = useCallback(() => {
    setUsername(nameInputRef.current?.value || '');
  }, []);

  const submitLogin = useCallback(() => {
    const value = nameInputRef.current?.value;
    if (value && onLogin) {
      setUsername('');
      onLogin(value);
    }
  }, [onLogin]);

  const onEnterPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Enter') {
        submitLogin();
      }
    },
    [submitLogin],
  );

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <header className={styles.header} data-testid={testID.container}>
      {user?.name ? (
        <div className={styles.logoutForm}>
          <p data-testid={testID.userWelcome}>
            Welcome back, <span>{user?.name}</span>
          </p>
          <div className={styles.logoutBtnWrapper}>
            <button className={styles.logout} data-testid={testID.logoutBtn} onClick={onLogout} type="button">
              logout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.loginForm}>
          <div className={styles.loginFormField}>
            <span>What username you wish to use?</span>
            <input
              ref={nameInputRef}
              className={styles.input}
              data-testid={testID.nameInput}
              onChange={onUsernameChange}
              onKeyDown={onEnterPress}
              type="text"
              value={username}
            />
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.login}
              data-testid={testID.loginBtn}
              disabled={username.length < 3}
              onClick={submitLogin}
              type="button"
            >
              login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
