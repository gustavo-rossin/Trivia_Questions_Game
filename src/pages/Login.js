import PropTypes from 'prop-types';
import React from 'react';
import logo from '../trivia.png';
// import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  validation = () => {
    const { name, email } = this.state;

    const isValidEmail = email.includes('@') && email.includes('.com');
    const isValidName = name.length > 0;

    if (isValidEmail && isValidName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  onChangeInput = ({ target }) => {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    }, this.validation);
  };

  // Requisito 3: criei a função toSettings para enviar o usuário para a página de configurações.
  toSettings = () => {
    const { history: { push } } = this.props;
    push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <div className="App-header">
        <h2>Login</h2>
        <img src={ logo } className="App-logo" alt="logo" />
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.onChangeInput }
          />
        </label>

        <label htmlFor="email">
          E-mail
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.onChangeInput }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => {} }
          disabled={ isDisabled }
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.toSettings }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
