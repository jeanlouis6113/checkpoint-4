import React from 'react';
import '../Style/Login.css';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordbis: '',
      redirect: false,
    };
  }

  UsernameField = (event) => {
    this.setState({ username: event.target.value });
  }

  PasswordField = (event) => {
    this.setState({ password: event.target.value });
  }

  PasswordBisField = (event) => {
    this.setState({ passwordbis: event.target.value });
  }

  handleSubmit = (event) => {
    const TOKEN_KEY = 'jwt';
    const token = localStorage.getItem(TOKEN_KEY);
    const { username, password, passwordbis } = this.state;
    event.preventDefault();
    if (password === passwordbis) {
      axios.post(`${API_URL}/api/auth/newuser`,
        { username, password }, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            alert(res.data.flash);
            this.setState({ redirect: true });
          }
        })
        .catch((err) => alert(err.response.data.flash));
    } else {
      alert('message: le mot de passe n est pas identique');
    }
  };

  render() {
    const {
      UsernameField, PasswordField, PasswordBisField, handleSubmit, state,
    } = this;
    const {
      username, password, passwordbis, redirect,
    } = state;

    return (
      <div>
        {redirect && <Redirect to="/login" />}
        <form onSubmit={handleSubmit}>
          <div classNameName="container log">
            <div className="login-content">
              <form action="index.html" className="form-login">
                <h2 className="title">Nouveau utilisateur</h2>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user" />
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Identifiant"
                      value={username}
                      onChange={UsernameField}
                      required
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      type="password"
                      className="input"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={PasswordField}
                      required
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      type="password"
                      className="input"
                      placeholder="Confirmation du mot de passe"
                      value={passwordbis}
                      onChange={PasswordBisField}
                      required
                    />
                  </div>
                </div>
                <div className="buttonUser">
                  <Button type="submit" className="btn" value="submit">Valider</Button>
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewUser;