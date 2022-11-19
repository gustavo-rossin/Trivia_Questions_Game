import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { act } from 'react-dom/test-utils';
import data from './helpers/data';

describe('testa página Game', () => {
  jest.setTimeout(60000);
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: jest.fn().mockResolvedValue(data)});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('testa as rotas', async () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    await act(() => {
      userEvent.type(nameInput, 'Raphael Righetti');
      userEvent.type(emailInput, 'rapha@trybe.com');
      userEvent.click(playBtn);
    });
    expect(history.location.pathname).toBe('/game');

    for (let i = 0; i < 5; i += 1) {
      userEvent.click(screen.getByTestId('correct-answer'));
      userEvent.click(screen.getByTestId('btn-next'));
    };
    expect(history.location.pathname).toBe('/feedback');
  });

  it('testa se o timer está funcionando', async () => {
    renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    await act(() => {
      userEvent.type(nameInput, 'Raphael Righetti');
      userEvent.type(emailInput, 'rapha@trybe.com');
      userEvent.click(playBtn);
    });

    const timer = screen.getByText(/30 s/i);
    const trueBtn = screen.getByText('true');
    const falseBtn = screen.getByText('false');
    await waitFor(() => {
      expect(timer).toHaveTextContent('29 s');
    }, {timeout: 1000});
      
    await waitFor(() => {
      expect(timer).toHaveTextContent('0 s');
      expect(trueBtn).toBeDisabled();
      expect(falseBtn).toBeDisabled();
    }, {timeout: 30000});
  });

  it('testa em caso de falha da API', async () => {
    jest.clearAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({json: jest.fn().mockResolvedValue({results: []})});
    const {history} = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    await act(() => {
      userEvent.type(nameInput, 'Raphael Righetti');
      userEvent.type(emailInput, 'rapha@trybe.com');
      userEvent.click(playBtn);
    });
    expect(history.location.pathname).toBe('/');
    screen.logTestingPlaygroundURL();
    await act(() => {
      userEvent.type(nameInput, 'Raphael Righetti');
      userEvent.type(emailInput, 'rapha@trybe.com');
      userEvent.click(playBtn);
    });
    jest.spyOn(history, 'push').mockRejectedValueOnce(new Error('erro'));
    expect(history.location.pathname).toBe('/');
  });
});
