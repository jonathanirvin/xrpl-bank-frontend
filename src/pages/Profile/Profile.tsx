import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
    const [ email, setEmail ] = useState<string>( '' );
    const history = useHistory();

    useEffect( () => {
        const token = localStorage.getItem( 'jwt' );
        if ( !token ) {
            // If no token, redirect to login
            history.push( '/login' );
            return;
        }

        axios.get( `${ import.meta.env.VITE_API_URL }/user/profile`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        } )
            .then( response => {
                setEmail( response.data.email );
            } )
            .catch( error => {
                console.error( 'Error fetching profile: ', error );
                // If token invalid or any error, redirect to login
                history.push( '/login' );
            } );
    }, [ history ] );

    const handleLogout = () => {
        localStorage.removeItem( 'jwt' );
        history.push( '/login' );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                {email ? (
                    <div>
                        <h2>Welcome, {email}!</h2>
                        <IonButton onClick={handleLogout} color="danger">Logout</IonButton>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}

            </IonContent>
        </IonPage>
    );
};

export default Profile;
