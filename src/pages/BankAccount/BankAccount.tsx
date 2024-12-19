import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const BankAccount: React.FC = () => {
    const [ email, setEmail ] = useState<string>( '' );
    const [ bankAccount, setBankAccount ] = useState<any>(null);
    const history = useHistory();
    const token = localStorage.getItem( 'jwt' );
    const [ xrpAddress, setXrpAddress ] = useState<string>( '' );
    const [ amount, setAmount ] = useState<string>( '' );

    useEffect( () => {
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
                history.push( '/login' );
            } );
    }, [] );

    const createBankAccount = () => {
        axios.post( `${ import.meta.env.VITE_API_URL }/bank-accounts/create`, {
            accountType: 'Checking'
        }, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        } )
        .then( response => {
            console.log( 'response', response );
            setBankAccount( response.data );
        } )
        .catch( error => {
            console.error( 'Error fetching profile: ', error );
            history.push( '/login' );
        } );
    }

    const sendPayment = () => {
        axios.post( `${ import.meta.env.VITE_API_URL }/bank-accounts/transfer-xrp-to-xrp-address`, {
            destinationAddress: xrpAddress,
            xrpCurrencyAmount: parseFloat( amount )
        }, {
            headers: { Authorization: `Bearer ${ token }` }
        } )
            .then( response => {
                console.log( 'Transaction successful: ', response.data );
            } )
            .catch( error => {
                console.error( 'Error sending transaction: ', error );
            } );
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bank Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">

                {email ? (
                    <div>
                        <h2>Your Bank Account</h2>
                        
                        <IonButton onClick={createBankAccount} color="success">Create New Bank Account</IonButton> <br /><br />

                        <h3>Send XRP</h3>
                        <IonLabel>XRP Address</IonLabel>
                        <IonInput
                            value={xrpAddress}
                            onIonChange={e => setXrpAddress( e.detail.value! )}
                            placeholder="Enter destination address"
                        ></IonInput>
                        <IonLabel>Amount (XRP)</IonLabel>
                        <IonInput
                            value={amount}
                            onIonChange={e => setAmount( e.detail.value! )}
                            placeholder="Enter XRP amount to send"
                        ></IonInput>
                        <IonButton onClick={sendPayment} color="primary">Send Transaction</IonButton>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}

            </IonContent>
        </IonPage>
    );
};

export default BankAccount;
