import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import AppProvider from '../context/AppProvider';
import { drinkCategories, mealCategories } from './categorymock';

describe('Test Recipe component', () => {
  it('Test if 5 category buttons is rendered in /meals', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealCategories,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const categoryButtonBeef = await screen.findByText(/beef/i);
    expect(categoryButtonBeef).toBeInTheDocument();
  });

  it('Test if 5 category buttons is rendered in /drinks', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinkCategories,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const categoryButtonCocoa = await screen.findByText(/cocoa/i);
    expect(categoryButtonCocoa).toBeInTheDocument();
  });
});
