import { render, screen, fireEvent } from '@testing-library/react';
import Header, { testID } from './Header';

const MOCK_USER = { name: 'Jest' };

describe('Header', () => {
  test('renders login form when user is not logged in', () => {
    render(<Header />);

    const loginForm: HTMLDivElement = screen.getByTestId(testID.container);
    const usernameInput: HTMLInputElement = screen.getByTestId(testID.nameInput);
    const loginButton: HTMLButtonElement = screen.getByTestId(testID.loginBtn);

    expect(loginForm).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('renders logout form when user is logged in', () => {
    render(<Header user={MOCK_USER} />);

    const welcomeMessage: HTMLParagraphElement = screen.getByTestId(testID.userWelcome);
    const logoutForm: HTMLDivElement = screen.getByTestId(testID.container);
    const logoutButton: HTMLButtonElement = screen.getByTestId(testID.logoutBtn);

    expect(logoutForm).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
    expect(welcomeMessage).toHaveTextContent(`Welcome back, ${MOCK_USER.name}`);
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls onLogin when login button is clicked', () => {
    const onLoginMock = jest.fn();
    render(<Header onLogin={onLoginMock} />);

    const usernameInput: HTMLInputElement = screen.getByTestId(testID.nameInput);
    const loginButton: HTMLButtonElement = screen.getByTestId(testID.loginBtn);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(loginButton);

    expect(onLoginMock).toHaveBeenCalledWith('testuser');
  });

  test('calls onLogout when logout button is clicked', () => {
    const onLogoutMock = jest.fn();
    render(<Header onLogout={onLogoutMock} user={MOCK_USER} />);

    const logoutButton: HTMLButtonElement = screen.getByTestId(testID.logoutBtn);

    fireEvent.click(logoutButton);

    expect(onLogoutMock).toHaveBeenCalled();
  });
});
