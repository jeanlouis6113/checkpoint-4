import React, { Component } from 'react';
import '../Style/Contact.css';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const recaptchaRef = React.createRef();

class Contact extends Component {
  constructor({ updatecontact }) {
    super({ updatecontact });
    this.state = {
      Nom: '',
      Prenom: '',
      Email: '',
      Comment: '',
      captcha: '',
      isSelect: false,
      redirect: false,
    };
  }

  onRecaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.setState({ captcha: recaptchaValue });
  };

  handleChange = (event) => {
    const { isSelect } = this.state;
    if (event.target.id === 'mention') {
      this.setState({ isSelect: !isSelect });
    } else {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
  };

  submitContact = () => {
    const {
      Nom, Prenom, Email, Comment, captcha, isSelect,
    } = this.state;
    if (captcha === '') {
      alert('Vous devez cocher la case je ne suis pas un robot ');
    } else if (isSelect === false) {
      alert('Vous devez cocher la case  mention légal');
    } else if (Nom === '' || Prenom === '' || Email === '') {
      alert('Vous devez remplir tout les champs');
    } else {
      console.log(API_URL);
      axios
        .post(`${API_URL}/api/contact/`, {
          Nom,
          Prenom,
          Email,
          Comment,
        })
        .then((res) => res.data)
        .then(() => {
          alert('Votre demande a bien été envoyée!');
          this.setState({ redirect: true });
        })
        .catch((err) => {
          // alert('An error occurred while sending the email');
          console.log(err);
          alert(err);
        });
    }
  };

  render() {
    const {
      handleChange, state, submitContact, onRecaptchaChange,
    } = this;
    const {
      Nom, Prenom, Email, Comment, redirect, isSelect,
    } = state;
    return (
      <>
        {redirect && <Redirect to="/" />}
        <Grid conatainer>
          <h2 className="titleContact">Contact</h2>
          <form>
            <div className="general">
              <div className="butNom">
                <label htmlFor="nom" className="label">
                  Nom:
                  <input
                    className="nom"
                    id="nom"
                    placeholder="Nom"
                    type="text"
                    name="Nom"
                    required
                    value={Nom}
                    onChange={(event) => handleChange(event)}
                  />
                </label>
              </div>
              <div className="butPrenom">
                <label htmlFor="prenom" className="label">
                  Prénom:
                  <input
                    className="prenom"
                    id="prenom"
                    placeholder="Prénom"
                    type="text"
                    name="Prenom"
                    required
                    value={Prenom}
                    onChange={(event) => handleChange(event)}
                  />
                </label>
              </div>
              <div className="butEmail">
                <label htmlFor="email" className="label">
                  Email:
                  <input
                    className="email"
                    type="text"
                    id="email"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    title="Adresse mail non valide"
                    placeholder="exemple@gmail.fr"
                    name="Email"
                    required
                    value={Email}
                    onChange={(event) => handleChange(event)}
                  />
                </label>
              </div>
              <div className="But">
                <textarea
                  className="but"
                  placeholder="Entrer votre texte ici..."
                  rows="8"
                  name="Comment"
                  value={Comment}
                  onChange={(event) => handleChange(event)}
                />
              </div>
              <div className="captcha-check ">
                <div className="captcha ">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6Lf1aq8ZAAAAAAHbCIndqVT9Io3k0332RkvpfTMx"
                    onChange={() => {
                      onRecaptchaChange();
                    }}
                  />
                </div>
                <div className="modalite">
                  <label className="mentionlegal" htmlFor="mentionlegal">
                    <input
                      type="checkbox"
                      id="mention"
                      name="isSelect"
                      checked={isSelect}
                      onChange={(event) => {
                        handleChange(event);
                      }}
                      required
                    />
                    En cochant cette case, j&apos;atteste avoir bien lu et
                    compris les informations fournies et accepte le traitement
                    de donnée à caractère personnel dans <Link to="/mentionlegal" >le cadre mentionné</Link>
                  </label>
                </div>
              </div>
              <div className="Button">
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    submitContact();
                  }}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </Grid>
      </>
    );
  }
}

export default Contact;
