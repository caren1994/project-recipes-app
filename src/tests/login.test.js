import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Lgin test', () => {
  test('Login Test', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeInTheDocument();

    userEvent.type(inputEmail, 'grupo7@grupo7.com');
    userEvent.type(inputPassword, '1234556');
    userEvent.click(buttonEnter);
  });
});
