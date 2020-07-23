import React from 'react';
import Container from '@material-ui/core/Container';
import Carrousel from './Carrousel';
import '../Style/Home.css';

// const APP_URL = process.env.REACT_APP_API_URL;

function Home() {
    return (
        <Container maxWidth>
            <div className="home_flexContainer">
                <div className="home_gridContainer">
                    <h1 className="title-home">Welcome Mimicircus</h1>
                    <div className="info">
                        <Carrousel className="carrousel" />
                    </div>
                </div>
                <h2 className="subtitle-home"> Qui sommes nous ?</h2>
                <div>
                    <div className="general-home ">
                        <div className="texte-générale">
                            <div className="text-home">
                                <p className="texte">
                                    Depuis sa constitution en 1981, l'association a créé pas moins de 10 spectacles et initie près de 2000 personnes par an.
                                    </p>
                                <p className="texte">Après des débuts a La Loupe puis en roulotte sur les routes de France, Mimicircus s'est intallée à En Sarthe en 2002. </p>
                                <p className="texte">C'est aujourd'hui sous un chapiteau semi-rigide de 700m² que le public est accueilli.</p>
                                <p className="texte">Une école de loisirs fixe, des ateliers et des initiations itinérants pour les établissements scolaires et socioculturels,
                                    Un spectacle, une saison culturelle.</p>
                                <p className="texte">Mimicircus offre une activité complète et polyvalente.</p>
                                <p className="texte">À Mimicircus, nous sommes convaincus d'une chose :
                                    le cirque est abordable par tous ! Pas d'âge limite, pas de force surhumaine requise...l'envie suffit !</p>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <img
                        className="image-home"
                        src={`${APP_URL}/images/Accueil.jpg`}
                        alt="Accueil"
                    />
                </div> */}
            </div>
        </Container>
    );
}
export default Home;