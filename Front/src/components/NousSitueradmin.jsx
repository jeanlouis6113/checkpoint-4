import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../utils/login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const API_URL = process.env.REACT_APP_API_URL;

function NousSitueradmin() {
  const [newDate, setNewDates] = useState({});
  const [dates, setDates] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const TOKEN_KEY = 'jwt';
  const token = localStorage.getItem(TOKEN_KEY);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function submitForm(e) {
    e.preventDefault();
    axios.post(`${API_URL}/api/date`, newDate, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .then(() => {
        alert('Date créé !');
        setRefresh(!refresh);
      })
      .catch((e) => {
        console.error(e);
        alert(`Erreur : ${e.message}`);
      });
  }

  function deleteDate(id) {
    axios.delete(`${API_URL}/api/date/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        alert('Date supprimé !');
        setRefresh(!refresh);
      })
      .catch((e) => {
        console.error(e);
        alert(`Erreur : ${e.message}`);
      });
  }

  useEffect(() => {
    function getDates() {
      axios.get(`${API_URL}/api/date`)
        .then((res) => res.data)
        .then((data) => { setDates(data); });
    }

    getDates();
  }, [refresh]);

  return (
    <>
    <button className="deconnexion " type="button" onClick={() => {
       logout();
       dispatch({ type: 'LOGOUT' });
        history.push('/');
          }}>
    Deconnexion
    </button>
    <div className="flexContainer">
    
      <div className="bg">
        <h1 className="title-date-admin">Créer une date</h1>
        <form onSubmit={submitForm}>
          Lieu:
          <input type="text" onChange={handleChange} name="location" />
                Date:
          <input type="date" onChange={handleChange} name="date" />
                Heure de début:
          <input type="time" onChange={handleChange} name="start_time" />
                Heure de fin:
          <input type="time" onChange={handleChange} name="end_time" />
          <button type="submit" className="ajoutButton">Ajouter</button>
        </form>
        <h2 className="title-date">Marchés à venir :</h2>
        <ul className="dateList">
          {dates.map((date) => (
            <li key={date.id} className="dateListItem">
              {' '}
              {date.location}
              {' :  '}
              {(new Date(date.date)).toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}
              {' '}
              {date.start_time.substring(0, 5)}
              {' - '}
              {date.end_time.substring(0, 5)}
              {' '}
              <button type="button" className="dateButton" onClick={() => deleteDate(date.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default NousSitueradmin;
