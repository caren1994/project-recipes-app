import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Login screen tests', () => {
  it('Checks if the email input appears on the screen and if it is possible to type in it', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    userEvent.type(inputEmail, 'grupo7@grupo7.com');
  });

  it('Checks if the password input appears on the screen and if it is possible to type in it', () => {
    renderWithRouter(<App />);

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    userEvent.type(inputPassword, '1234567');
  });

  it('Checks if the button contains the text "Enter"', () => {
    renderWithRouter(<App />);

    const textButtonEnter = screen.getByText(/Enter/i);
    expect(textButtonEnter).toBeInTheDocument();
    expect(textButtonEnter).toBeDisabled();
  });

  it('Checks if the Enter button can be clicked', () => {
    renderWithRouter(<App />);

    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeInTheDocument();
    userEvent.click(buttonEnter);
  });

  it('If clicking on the button redirects to /meals', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'grupo7@grupo7.com');
    userEvent.type(inputPassword, '1234567');
    const textButtonEnter = screen.getByText(/Enter/i);
    expect(textButtonEnter).not.toBeDisabled();
    userEvent.click(buttonEnter);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
