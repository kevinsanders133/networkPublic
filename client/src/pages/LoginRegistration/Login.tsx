import React from 'react';
import axios from 'axios';

interface LoginProps {
  authorize: () => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ authorize }) => {

  const LOGIN_API = 'http://localhost:5005/login';

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
    const password = (form.querySelector('input[name="password"]') as HTMLInputElement).value;

    const data = { email, password };

    try {
      await axios.post(LOGIN_API, data);
      await authorize();
    }
    catch(e) {
      console.log(e);
    }
  }

  return (
    <section className="login-form-container">
      <h1 className="title">Sign in</h1>
      <form onSubmit={handleForm} className="login-form">
        <label className="login-form__label">Email address</label>
        <input type="email" name="email" className="login-form__input" autoComplete="username" placeholder="Email address" required />
        <label className="login-form__label">Password</label>
        <input type="password" name="password" className="login-form__input" autoComplete="current-password" placeholder="Password" required />
        <input type="submit" value="Sign in" className="login-form__submit" />
      </form>
    </section>
  )
};

export default Login;