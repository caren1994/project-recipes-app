import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Meals from '../components/Header';
import Drinks from '../pages/Drinks';
import { mealIngredientChicken } from './mealmock';
import AppProvider from '../context/AppProvider';

describe('test search bar component', () => {
  it('Search Meal By Ingredient', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealIngredientChicken,
    }));

    const { debug } = renderWithRouter(
      <AppProvider>
        <Meals />
      </AppProvider>,
    );
    const searchIcon = screen.getByRole('img', {
      name: /search icon/i,
    });
    userEvent.click(searchIcon);

    const searchInput = screen.getByRole('textbox', {
      name: /procurar:/i,
    });
    const ingredient = screen.getByText(/ingredient/i);
    // const name = screen.getByText(/name/i);
    // const firstLetter = screen.getByText(/first letter/i);
    const searchBtn = screen.getByText('Search');

    userEvent.click(ingredient);
    userEvent.type(searchInput, 'beef');
    userEvent.click(searchBtn);

    waitFor(async () => {
      const headings = await screen.findAllByRole('heading', { level: 3 });
      console.log(headings);
      // headings.forEach((heading) => {
      //   expect(heading).not.toBeInTheDocument();
    });

    debug();
  });
});
