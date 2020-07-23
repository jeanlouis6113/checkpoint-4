import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function GalleryList() {
    const [gallerys, setGallerys] = useState([]);


    useEffect(() => {
        function getGallerys() {
            axios.get(`${API_URL}/api/gallery/`)
                .then((res) => res.data)
                .then((data) => { setGallerys(data); });
        }

        getGallerys();
    }, []);

    return (
        <div >
            <div className="">
                <div className="">
                    {gallerys.map((gallery) => (
                        <Link to={`/gallery/${gallery.id}`} className="background" >
                            <Card className="background" >
                                <CardContent className="" >
                                <h4 className="galleryName">{gallery.name}</h4>
                                    <img src={`${API_URL}/images/${gallery.image}`} alt="Photos " className="images" />
                                    <p className="text-description">{gallery.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GalleryList;
