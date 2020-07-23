import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UploadFile = ({ setLoaded, loaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState('');
  const APP_URL = process.env.REACT_APP_API_URL;
  const TOKEN_KEY = 'jwt';
  const history = useHistory();

  const onChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/jpg' && selectedFile.type !== 'image/png') {
      alert('Only jpeg are allowed');
    } else {
      const data = new FormData();
      console.log(data);
      console.log(APP_URL);
      data.append('file', selectedFile);
      axios.post(`${APP_URL}/api/upload/accueil`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.data)
        .then((res) => {
          setFilename(res.filename);
          setLoaded(!loaded);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert('veuillez vous reconnecter');
            history.push('/login');
          } else {
            alert(err);
          }
        });
    }
  };

  return (
    <>
      <input className="buttonFichier" type="file" name={filename} accept="image/*" onChange={onChangeHandler} />
      <button className="buttonUpload" type="button" onClick={onClickHandler}>
        Upload
      </button>
    </>
  );
};

export default UploadFile;
