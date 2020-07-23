import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/NousSituer.css';

const API_URL = process.env.REACT_APP_API_URL;

function NousSituer() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    function getDates() {
      axios.get(`${API_URL}/api/date`)
        .then((res) => res.data)
        .then((data) => { setDates(data); });
    }

    getDates();
  }, []);

  return (
    <div className="flexContainer">
      <div className="map">
      <iframe src="https://www.google.com/maps/d/embed?mid=1AEB-19Q5ENP1h9UMJ5-IhkByL3GDipni"  className="carte" width="640" title="carte des représentations"height="480"/>
      </div>
      <div className="bg">
        <h2 className="title-date" >Venez nous retrouver à :</h2>
        <ul className="dateList">
          {dates.map((date) => (
            <li key={date.id} className="dateListItem">
              {' '}
              {date.location}
              {' :  '}
              <span>
                le
                {' '}
                {(new Date(date.date)).toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}
                {' '}
                de
                {' '}
                {date.start_time.substring(0, 5)}
                {' '}
                à
                {' '}
                {date.end_time.substring(0, 5)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default NousSituer;
