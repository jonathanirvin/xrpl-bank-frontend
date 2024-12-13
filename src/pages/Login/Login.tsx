import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post( `${ import.meta.env.VITE_API_URL }/auth/login`, { email, password } );
            const { token } = response.data;
            // Store token in localStorage for authenticated requests
            localStorage.setItem( 'jwt', token );
            history.push( '/profile' );
        } catch ( error ) {
            console.error( 'Login Error: ', error );
            alert( 'Invalid credentials' );
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
                    <IonTitle>Login</IonTitle>
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

                <IonButton expand="block" onClick={handleLogin}>Login</IonButton>

                <IonButton fill="clear" onClick={() => history.push( '/register' )}>Don't have an account? Register</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
