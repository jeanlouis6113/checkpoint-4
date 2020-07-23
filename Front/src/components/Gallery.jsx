import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Style/Gallery.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function Product() {
  const [gallery, setGallery] = useState([]);
  const { galleryId } = useParams();


  useEffect(() => {
    function getGallery() {
      axios.get(`${API_URL}/api/gallery/${galleryId}`)
        .then((res) => res.data)
        .then((data) => { setGallery(data); });
    }

    getGallery();
  }, [galleryId]);

  if (gallery === undefined) {
    return (
      <div className="background" >
        <div className="background" >
          <p>Loading</p>
        </div>
      </div>
    );
  }
  return (
    <div className="background">
      <div className="background" >
        <img src={`${API_URL}/images/${gallery.image}`} alt="photos" className="images" />
        <div className="gallery_text">
          <h2 className="gallery_name">{gallery.name}</h2>
          <p>{gallery.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;