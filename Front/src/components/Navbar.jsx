import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector } from 'react-redux';
import BurgerMenu from './BurgerMenu';


function Navbar() {
    const login = useSelector((state) => state.login);

    return (
        <div className="navbarRoot ">
            <AppBar position="static">
                <Toolbar className="navbar">
                    <div className="burgerButton">
                        <BurgerMenu />
                    </div>
                    <Typography variant="h6" className="navbarItems">
                        {login ? <Link to="/homeadmin">Accueil</Link> : <Link to="/">Accueil</Link>}
                    </Typography>
                    <Typography variant="h6" className="navbarItems">
                        {login ? <Link to="/galleryadmin">Galerie</Link> : <Link to="/gallery">Galerie</Link>}
                    </Typography>
                    <Typography variant="h6" className="navbarItems">
                        {login ? <Link to="/noussitueradmin">Où nous trouver?</Link> : <Link to="/noussituer">Où nous trouver?</Link>}
                    </Typography>
                    <Typography variant="h6" className="navbarItems">
                        {login ? <Link to="/newuser">Création utilisateur</Link> : <Link to="/contact">Contact</Link>}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}


export default Navbar;
