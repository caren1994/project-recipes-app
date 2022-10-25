import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Footer from '../components/Footer';
import renderWithRouter from './renderWithRouter';

describe('Footer component tests', () => {
  it('check if the drinks button is working', () => {
    const { history } = renderWithRouter(<Footer />);
    const button = screen.getByTestId('drinks-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Check if the meals button is working', () => {
    const { history } = renderWithRouter(<Footer />);
    const button = screen.getByTestId('meals-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
