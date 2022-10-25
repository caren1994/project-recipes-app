import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import App from '../App';
import Header from '../components/Header';

describe('Header component tests', () => {
  it('Checks if the route changes to the "/profile" profile screen', () => {
    const { history } = renderWithRouter(<Header />);

    const buttonProfile = screen.getByTestId('profile-top-btn');

    userEvent.click(buttonProfile);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Testt btn pesquisa', () => {
  });
});
