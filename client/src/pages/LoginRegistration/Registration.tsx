import React from 'react';
import axios from 'axios';

const Registration: React.FC = () => {

  const REGISTRATION_API = 'http://localhost:5005/registration';

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const nickname = (form.querySelector('input[name="nickname"]') as HTMLInputElement).value;
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
    const emailCheck = (form.querySelector('input[name="emailCheck"]') as HTMLInputElement).value;
    const password = (form.querySelector('input[name="password"]') as HTMLInputElement).value;
    const passwordCheck = (form.querySelector('input[name="passwordCheck"]') as HTMLInputElement).value;

    const data = { nickname, email, emailCheck, password, passwordCheck };

    try {
      await axios.post(REGISTRATION_API, data);
      window.location.href = '/login';
    }
    catch(e) {
      console.log(e);
    }
  }

  return (
    <section className="login-form-container">
      <h1 className="title">Sign up</h1>
      <form onSubmit={handleForm} className="login-form">
        <label className="login-form__label">Nickname *</label>
        <input type="text" name="nickname" className="login-form__input" placeholder="Nickname" required />
        <label className="login-form__label">Email address *</label>
        <input type="email" name="email" className="login-form__input" autoComplete="username" placeholder="Email address" required />
        <label className="login-form__label">Re-enter email address *</label>
        <input type="email" name="emailCheck" className="login-form__input" autoComplete="username" placeholder="Re-enter email address" required />
        <label className="login-form__label">Password *</label>
        <input type="password" name="password" className="login-form__input" autoComplete="current-password" placeholder="Password" required />
        <label className="login-form__label">Re-enter password *</label>
        <input type="password" name="passwordCheck" className="login-form__input" autoComplete="current-password" placeholder="Re-enter password" required />
        <input type="submit" value="Sign up" className="login-form__submit" />
      </form>
    </section>
  )
};

export default Registration;