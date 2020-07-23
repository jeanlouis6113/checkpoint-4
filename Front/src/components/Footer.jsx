import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Mail from '../images/mail.svg';
import Linkedin from '../images/linkedin.svg';
import Github from '../images/github.svg';
import '../Style/Footer.css';

function Footer() {
  return (
    <Container maxWidth className="bloc">

      <div className=" ">
        <div className="logo-rs ">
        <Link className="administrateur" to="/login" >Mode administrateur</Link>
          <a
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/jean-louis-poussin-07a67719b"
          >
            <img
              className="logo"
              src={Linkedin}
              alt="linkedin"
            />
          </a>
          <a
            className="logo"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jeanlouis6113"
          >
            <img
              className="logo"
              src={Github}
              alt="github"
            />
          </a>
          <Link to="/contact">
            <img className="logo" src={Mail} alt="mail" />
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Footer;
