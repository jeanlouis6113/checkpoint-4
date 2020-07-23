import React, { useState} from 'react';
import axios from 'axios';
import '../Style/Gallery.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../utils/login';


const API_URL = process.env.REACT_APP_API_URL;

function GalleryAdmin() {
  const [gallery, setGallery] = useState({ name: "", description: "" });
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const TOKEN_KEY = 'jwt';
  const token = localStorage.getItem(TOKEN_KEY);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  function submitForm(e) {
    e.preventDefault();
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        alert('Only jpeg/jpg and png are allowed');
      } else {
        const data = new FormData();
        data.append('file', file);
        axios.post(`${API_URL}/api/upload/gallery`, data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.data)
          .then((data) => {
            const gallery2 = { ...gallery, image: data.image, id: data.id };
            return gallery2;
          })
          .then((gallery) => {
            const { id: _, ...gallery3 } = gallery;
            axios.put(`${API_URL}/api/gallery/${gallery.id}`, gallery3, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
              .then((res) => res.data)
              .then(() => {
                setGallery({ name: "", description: "" });
                setFile(null);
                setFilePreview(null, () => {
                  alert('Image ajouté !');
                });
              })
          })
          .catch((e) => {
            console.error(e);
            alert(`Erreur : ${e.message}`);
          });
      }
    } else {
      alert("selectionner un fichier avant de valider")
    }

  }


  return (
    <div className="">
      <div className="">
        <button className="deconnexion " type="button" onClick={() => { logout(); dispatch({ type: 'LOGOUT' }); history.push('/'); }}>
          Deconnexion
        </button>
        <form onSubmit={submitForm} encType="multipart/form-data" className="">
          <div className="Container-gallery">
            <h2 className="gallery-name">Création d'une nouvelle insertion:</h2>
            <div className="formulaire">
              <p>Nom :</p>
              <input type="long" onChange={handleChange} name="name" value={gallery.name} className="nom-gallery" />
              <p>Description :</p>
              <input type="text" onChange={handleChange} name="description" value={gallery.description} className="description" />
            </div>
            <input type="file" onChange={handleFile} className="upload" />
            <img src={filePreview} alt="uploaded" className="upload1" />
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GalleryAdmin;
