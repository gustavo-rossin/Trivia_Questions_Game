import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de Login', () => {
  it('Verifica se o botão Play permanece desabilitado quando os inputs de Nome e Email estão vazios.', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    userEvent.click(inputName);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.click(inputEmail);

    const buttonPlay = screen.getByRole('button', { name: 'Play' });
    expect(buttonPlay.disabled).toBeTruthy();
  });

  it('Verifica se o botão Play é habilitado quando os inputs de Nome e Email são preenchidos.', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    userEvent.click(inputName);
    userEvent.type(inputName, 'Carlos');

    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'carlos@biblioteca.com');

    const buttonPlay = screen.getByRole('button', { name: 'Play' });
    expect(buttonPlay.disabled).toBeFalsy();
  });

  it('Verifica se o Jogo Trivia encaminha o jogador para a página de Game.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const inputName = screen.getByTestId('input-player-name');
    userEvent.click(inputName);
    userEvent.type(inputName, 'Carlos');

    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.click(inputEmail);
    userEvent.type(inputEmail, 'carlos@biblioteca.com');

    const buttonPlay = screen.getByRole('button', { name: 'Play' });
    userEvent.click(buttonPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });

  it('Verifica se o Jogo Trivia encaminha o jogador para a página de Configurações.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const buttonSettings = screen.getByRole('button', { name: 'Settings' });
    userEvent.click(buttonSettings);

    expect(history.location.pathname).toBe('/settings');
  });
});
