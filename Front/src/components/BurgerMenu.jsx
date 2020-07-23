import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import burgerIcon from '../images/burgerIcon.png';
import '../Style/BurgerMenu.css';
import { useSelector } from 'react-redux';


function BurgerMenu() {
  const login = useSelector((state) => state.login);
  const [left, setLeft] = useState(false);

  const sideList = (
    <div className="burgerMenu">
      {login ? <Link to="/homeadmin" className="burgerLink">Accueil</Link> : <Link className="burgerLink" to="/">Accueil</Link>}
      {login ? <Link className="burgerLink" to="/galleryadmin">Galerie</Link> : <Link className="burgerLink" to="/gallery">Galerie</Link>}
      {login ? <Link className="burgerLink" to="/noussitueradmin">Où nous trouver?</Link> : <Link className="burgerLink" to="/noussituer">Où nous trouver?</Link>}
      {login ? <Link className="burgerLink" to="/newuser">Création utilisateur</Link> : <Link className="burgerLink" to="/contact">Contact</Link>}
    </div>
  );

  return (
    
    <div>
      <Button onClick={() => setLeft(true)}><img src={burgerIcon} className="logoburger" alt="small basket icon" /></Button>
      <Drawer anchor="left" open={left} onClose={() => setLeft(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setLeft(false)}
          onKeyDown={() => setLeft(false)}>
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

export default BurgerMenu;
