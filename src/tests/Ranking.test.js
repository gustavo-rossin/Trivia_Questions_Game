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

  it('testa ', async () => {
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
    const homeBtn = screen.getByTestId('btn-go-home');
    userEvent.click(homeBtn);
    expect(history.location.pathname).toBe('/');
  });
});