import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { mealFirstLetterM, mealIngredientChicken, mealNameRisotto } from './mealmock';
import AppProvider from '../context/AppProvider';
import { drinkFirstLetterA, drinkIngredientLemon, drinkNameCubaLibre } from './drinkmock';

describe('test search bar component in path /meals', () => {
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
    userEvent.type(searchInput, 'risotto');

    const name = screen.getByRole('radio', {
      name: /name/i,
    });
    userEvent.click(name);

    const searchBtn = screen.getByText('Search');

    await act(() => {
      userEvent.click(searchBtn);
    });

    expect(history.location.pathname).toBe('/meals/52823');
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=risotto');

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
    userEvent.type(searchInput, 'm');

    const firstLetter = screen.getByText(/first letter/i);
    userEvent.click(firstLetter);

    const searchBtn = screen.getByText('Search');
    userEvent.click(searchBtn);

    await screen.findByText('Mediterranean Pasta Salad');

    jest.clearAllMocks();
  });
});

describe('test search bar component in path /drinks', () => {
  it('Search Drink By Ingredient', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinkIngredientLemon,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    userEvent.type(searchInput, 'lemon');

    const ingredient = screen.getByText(/ingredient/i);
    userEvent.click(ingredient);

    const searchBtn = screen.getByText('Search');
    userEvent.click(searchBtn);

    await screen.findByText('A True Amaretto Sour');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');

    jest.clearAllMocks();
  });

  it('Search Drink By Name', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinkNameCubaLibre,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    userEvent.type(searchInput, 'cuba libre');

    const name = screen.getByText(/name/i);
    userEvent.click(name);

    const searchBtn = screen.getByText('Search');
    await act(() => {
      userEvent.click(searchBtn);
    });

    expect(history.location.pathname).toBe('/drinks/11288');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cuba libre');

    jest.clearAllMocks();
  });

  it('Search Drink By Name', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinkFirstLetterA,
    }));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    userEvent.type(searchInput, 'a');

    const name = screen.getByText(/name/i);
    userEvent.click(name);

    const searchBtn = screen.getByText('Search');
    userEvent.click(searchBtn);

    await screen.findByText('A1');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a');

    jest.clearAllMocks();
  });
});
