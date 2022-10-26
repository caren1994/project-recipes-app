import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mealFirstLetterM, mealIngredientChicken, mealNameRisotto } from './mealmock';
import AppProvider from '../context/AppProvider';

describe('test search bar component', () => {
  it('Search Meal By Ingredient', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealIngredientChicken,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    const ingredient = screen.getByText(/ingredient/i);
    const searchBtn = screen.getByText('Search');

    userEvent.click(ingredient);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(searchBtn);

    await screen.findByText('Brown Stew Chicken');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    jest.clearAllMocks();
  });

  it('Search Meal By Name', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealNameRisotto,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    const name = screen.getByText(/name/i);
    const searchBtn = screen.getByText('Search');
    userEvent.click(name);
    userEvent.type(searchInput, 'risotto');

    act(() => {
      userEvent.click(searchBtn);
    });
    jest.clearAllMocks();
  });

  it('Search Meal By First Letter', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealFirstLetterM,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    const firstLetter = screen.getByText(/first letter/i);
    const searchBtn = screen.getByText('Search');
    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'm');
    userEvent.click(searchBtn);

    await screen.findByText('Mediterranean Pasta Salad');
    jest.clearAllMocks();
  });
});
