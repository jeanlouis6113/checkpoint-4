import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const TOKEN_KEY = 'jwt';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [login, setLogin] = useState(false);
  const [wait, setWait] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    axios.get(`${API_URL}/api/auth/valide_token`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setLogin(true);
          setWait(true);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setLogin(false);
          setWait(true);
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setLogin(false);
        setWait(true);
      });
  }, []);


  return (
    <>
      {wait
        ? (
          <Route
            {...rest}
            render={(props) => (login ? <Component {...props} /> : <Redirect to="/login" />)}
          />
        )
        : (<p>Waiting</p>)}
    </>
  );
};

export default PrivateRoute;
