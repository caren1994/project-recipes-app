import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const MIN_PASSWORD_LENGTH = 7;

function Login(props) {
  // o props da função é history que ela pegou do app , porém nao precisava era só usar o usehistory
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
    const isEmailValid = email.match(vEmail) != null;
    // se o estado que guardo oq  foi digitado no input deu match com o regex imposto que seja diferente de null
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    setIsDisabled(!(isEmailValid && isPasswordValid));
    // se os dois forem verdadeiros ele troca o estado do disabled
  }, [password, email]);

  const buttonHandler = (e) => {
    e.preventDefault();
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    const { history } = props;
    history.push('/meals');
    // salva no local storage o email e redireciona para a tela meals
  };

  return (
    <div
      className=" bodyy flex  w-full h-screen justify-center items-center
       bg-white
   "
    >
      <div
        className=" flex  flex-col
        justify-center "
      >
        <h1
          className="mt-4 text-3xl  box-border border-b-2 border-orange-400"
        >
          Login

        </h1>
        <form
          onSubmit={ buttonHandler }
          className="flex flex-col
         justify-center p-8 gap-3 "
        >
          <label htmlFor="email" className="flex ">

            <input
              className=" h-8 w-48 box-border border-2 border-gray-400  rounded-md"
              data-testid="email-input"
              id="email"
              type="email"
              placeholder="email"
              value={ email }
              onChange={ emailHandler }
            />
          </label>
          <label htmlFor="password" className="flex">

            <input
              className=" h-8 w-48 box-border border-2 border-gray-400 rounded-md"
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
            className="text-2xl mt-5  bg-orange-400  rounded-md w-48"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
