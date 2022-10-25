import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Meals from '../components/Header';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';

describe('Header component tests', () => {
  it('Checks if the route changes to the "/profile" profile screen', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.type(screen.getByTestId('email-input'), 'grupo7@grupo7.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));

    expect(history.location.pathname).toBe('/meals');
  });

  it('Checks in \'/meals\' if two icon buttons are rendered', () => {
    renderWithRouter(<Meals />);

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });

    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  it('Checks in \'/drinks\' if two icon buttons and title are rendered', () => {
    renderWithRouter(<Drinks />);

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });

    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  it('Checks in \'/profile\' if one icon button and title are rendered', () => {
    renderWithRouter(<Profile />);

    const profileIcon = screen.getByRole('img', {
      name: /profile icon/i,
    });
    expect(profileIcon).toBeInTheDocument();
    // have to test if searchbutton is not.
  });

  it('', () => {
    const { history } = renderWithRouter(<Meals />);

    userEvent.click(screen.getByRole('img', {
      name: /profile icon/i,
    }));

    expect(history.location.pathname).toBe('/profile');
  });

  it('Checks for search inputs when search icon is clicked', () => {
    renderWithRouter(<App />);

    userEvent.type(screen.getByTestId('email-input'), 'grupo7@grupo7.com');
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));
    expect(screen.getByRole('textbox', {
      name: /procurar:/i,
    })).toBeInTheDocument();

    expect(screen.getByText(/ingredient/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/first letter/i)).toBeInTheDocument();

    expect(screen.getByRole('textbox', {
      name: /procurar:/i,
    })).toBeInTheDocument();
  });
});
