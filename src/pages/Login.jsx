import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const MIN_PASSWORD_LENGTH = 7;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const emailHandler = ({ target: { value } }) => {
    setEmail(value);
  };

  const passwordHandler = ({ target: { value } }) => {
    setPassword(value);
  };

  useEffect(() => {
    const vEmail = /^\S+@\S+\.\S+$/;
    // const vEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isEmailValid = email.match(vEmail) != null;
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [password, email]);

  const buttonHandler = (e) => {
    e.preventDefault();
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    const { history } = props;
    history.push('/meals');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ buttonHandler }>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            id="email"
            type="email"
            placeholder="email"
            value={ email }
            onChange={ emailHandler }
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            id="password"
            type="password"
            placeholder="password"
            value={ password }
            onChange={ passwordHandler }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
