import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const history = useHistory();

    const handleRegister = async () => {
        try {
            await axios.post( `${ import.meta.env.VITE_API_URL }/auth/register`, { email, password } );
            // On success, redirect to login page
            history.push( '/login' );
        } catch ( error ) {
            console.error( 'Registration Error: ', error );
            alert( 'Registration failed' );
        }
    };

    const handleKeyDown = ( event ) => {
        if ( event.key === 'Shift' ) {
            console.log( 'shifted' );
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                <IonItem>
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput type="email" value={email} onKeyDown={handleKeyDown} onIonInput={e => setEmail( e.detail.value! )} placeholder="Enter email" />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput
                        label="Password"
                        labelPlacement="floating"
                        fill="outline"
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onIonInput={( e ) => setPassword( e.detail.value! )}
                        onKeyDown={handleKeyDown}
                    />
                </IonItem>

                <IonButton expand="block" onClick={handleRegister}>Register</IonButton>
                <IonButton fill="clear" onClick={() => history.push( '/login' )}>Already have an account? Login</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Register;
