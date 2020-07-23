import React, { useState } from 'react';
import '../Style/Login.css';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { login } from '../utils/login';


const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${API_URL}/api/auth/login`,
      { username, password })
      .then((res) => {
        if (res.status === 200) {
          login(res.data.token);
          dispatch({ type: 'LOGIN' });
          alert(res.data.message);
          setRedirect(true);
        }
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <Container>
      <div>
        {redirect && <Redirect to="/homeadmin" />}
        <form onSubmit={handleSubmit}>
          <div classNameName="container log">
            <div className="login-content">
              <form action="index.html" className="form-login">
                <h2 className="title">Connexion</h2>
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
                      onChange={(event) => { setUsername(event.target.value); }}
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
                      onChange={(event) => { setPassword(event.target.value); }}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="btn button-envoyer" value="Se connecter">Se connecter</Button>
              </form>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;

