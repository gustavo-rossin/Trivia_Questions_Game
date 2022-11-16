import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import data from './helpers/data';

describe('testa página de feedback', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: jest.fn().mockResolvedValue(data)});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa botão play again', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    await act(() => {
      userEvent.type(nameInput, 'Raphael Righetti');
      userEvent.type(emailInput, 'rapha@trybe.com');
      userEvent.click(playBtn);
    });
    for (let i = 0; i < 5; i += 1) {
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(screen.getByTestId('btn-next'));
    }
    expect(history.location.pathname).toBe('/feedback');
    const playAgainBtn = screen.getByRole('button', { name: /play again/i });
    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');
  });
  it('testa botão ranking', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    await act(() => {
      userEvent.type(nameInput, 'Raphael Righetti');
      userEvent.type(emailInput, 'rapha@trybe.com');
      userEvent.click(playBtn);
    });
    for (let i = 0; i < 5; i += 1) {
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(screen.getByTestId('btn-next'));
    }
    const rankingBtn = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(rankingBtn);
    expect(history.location.pathname).toBe('/ranking');
  });
});

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
