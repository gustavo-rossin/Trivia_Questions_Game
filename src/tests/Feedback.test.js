import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de Feedback', () => {
  it('Testa se botão Ranking leva o jogador para a tela de Ranking', () => {
    const initialState = {
        player: {
          name: 'Carol',
          assertions: 0,
          score: 0,
          email: 'contacto@emmasaldierna.com'
        }
      };

    const route = '/feedback';

    const { history } = renderWithRouterAndRedux(<App />, initialState, route);

    expect(history.location.pathname).toBe('/feedback');

    const buttonRanking = screen.getByRole('button', { name: 'Ranking' });
    userEvent.click(buttonRanking);

    expect(history.location.pathname).toBe('/ranking');
  });

  it('Testa se botão Play Again leva o jogador para a tela de Login', () => {
    const initialState = {
        player: {
          name: 'Carol',
          assertions: 0,
          score: 0,
          email: 'contacto@emmasaldierna.com'
        }
      };

    const route = '/feedback';

    const { history } = renderWithRouterAndRedux(<App />, initialState, route);

    expect(history.location.pathname).toBe('/feedback');

    const buttonPlayAgain = screen.getByRole('button', { name: 'Play Again' });
    userEvent.click(buttonPlayAgain);

    expect(history.location.pathname).toBe('/');
  });
});
