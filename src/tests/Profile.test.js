import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './renderWithRouter';
import AppProvider from '../context/AppProvider';

const localStorage = (id, local) => {
  window.localStorage.setItem(id, JSON.stringify(local));
};

localStorage('user', { email: 'test@gmail.com' });
localStorage('doneRecipes', []);
localStorage('favoriteRecipes', []);
localStorage('inProgressRecipes', {});

describe('Profile component tests', () => {
  it('Checks if email and buttons are rendered', () => {
    renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );

    const email = screen.getByTestId(/profile-email/i);
    const doneRecipes = screen.getByTestId(/profile-done-btn/i);
    const FavRecipes = screen.getByTestId(/profile-favorite-btn/i);
    const logoutBtn = screen.getByTestId(/profile-logout-btn/i);

    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(FavRecipes).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    expect(JSON.parse(window.localStorage.getItem('user'))).toEqual({ email: 'test@gmail.com' });
    expect(JSON.parse(window.localStorage.getItem('doneRecipes'))).toEqual([]);
    expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toEqual([]);
    expect(JSON.parse(window.localStorage.getItem('inProgressRecipes'))).toEqual({});
  });

  it('checks if the Favorite Recipes button forwards to the correct page.', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );

    const FavRecipes = screen.getByTestId(/profile-favorite-btn/i);

    userEvent.click(FavRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('checks if the Done Recipes button takes you to the correct page', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );

    const doneRecipes = screen.getByTestId(/profile-done-btn/i);
    userEvent.click(doneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Checks if logout button forwards to the correct page', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );

    const logoutBtn = screen.getByTestId(/profile-logout-btn/i);
    userEvent.click(logoutBtn);

    expect(JSON.parse(window.localStorage.getItem('user'))).toBeNull();
    expect(JSON.parse(window.localStorage.getItem('doneRecipes'))).toBeNull();
    expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toBeNull();
    expect(JSON.parse(window.localStorage.getItem('inProgressRecipes'))).toBeNull();

    expect(history.location.pathname).toBe('/');
  });

  it('Checks when user enters Profile page without login', () => {
    renderWithRouter(
      <AppProvider>
        <Profile />
      </AppProvider>,
    );
    const email = screen.getByTestId('profile-email');
    expect(email.textContent).toBe('');
  });
});
