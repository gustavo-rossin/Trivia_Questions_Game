import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
    };
  }

  componentDidMount() {
    this.getGravatar();
  }

  getGravatar = async () => {
    const { gravatarEmail } = this.props;
    const HASH = md5(gravatarEmail).toString();
    const URL = 'https://www.gravatar.com/avatar';
    const result = await fetch(`${URL}/${HASH}`);
    this.setState({
      image: result,
    });
  };

  render() {
    const { image } = this.state;
    const { name, score } = this.props;

    return (
      <div>
        <p>{ name }</p>
        <p>{ score }</p>
        <img src={ image } alt="" data-testid="header-profile-picture" />
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

export default connect(mapStateToProps)(Header);
