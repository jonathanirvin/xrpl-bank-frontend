import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption
} from '@ionic/react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import './StripeForm.css';

const StripeForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [ clientSecret, setClientSecret ] = useState<string | null>( null );
    const [ amount, setAmount ] = useState<string>( '50' );
    const [ customAmount, setCustomAmount ] = useState<string>( '' );
    const [ nameOnCard, setNameOnCard ] = useState<string>( '' );
    const [ customerName, setCustomerName ] = useState<string>( '' );
    const [ sameAsCustomer, setSameAsCustomer ] = useState<boolean>( true );
    const [ email, setEmail ] = useState<string>( '' );
    const [ statusMessage, setStatusMessage ] = useState<string | null>( null );
    const [ isLoading, setIsLoading ] = useState<boolean>( false );
    const [ isSuccess, setIsSuccess ] = useState<boolean | null>( null );

    const token = localStorage.getItem( 'jwt' );

    // Stripe style options for the CardElement
    const cardElementOptions = {
        style: {
            base: {
                color: '#424770',
                border: '#e1c6a4',
            },
        },
    };

    // Keep nameOnCard in sync with customerName if "sameAsCustomer" is checked
    useEffect( () => {
        if ( sameAsCustomer ) {
            setNameOnCard( customerName );
        }
    }, [ sameAsCustomer, customerName ] );

    const handleCustomAmountChange = ( e: any ) => {
        const value = e.detail.value;
        const regex = /^\d*(\.\d{0,2})?$/;
        if ( regex.test( value ) ) {
            setCustomAmount( value );
        }
        // else optionally show a validation message or handle invalid input
    };

    const handleSubmit = async ( event: React.FormEvent ) => {
        event.preventDefault();
        if ( !stripe || !elements ) return;

        setIsLoading( true );
        setIsSuccess( null );
        setStatusMessage( '' );

        try {
            // Determine final deposit amount in cents
            const amountToSend =
                amount === 'other'
                    ? Math.round( parseFloat( customAmount ) * 100 ) // Convert to cents
                    : parseInt( amount ) * 100; // Convert preset amount to cents

            if ( isNaN( amountToSend ) || amountToSend <= 0 ) {
                throw new Error( 'Invalid deposit amount.' );
            }

            // Request a PaymentIntent from the backend
            const response = await fetch(
                import.meta.env.VITE_API_URL + '/bank-accounts/deposit',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${ token }`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( {
                        amountToDeposit: amountToSend,
                        email,
                        customerName,
                    } ),
                }
            );

            if ( !response.ok ) {
                throw new Error( 'Failed to create PaymentIntent.' );
            }

            const data = await response.json();
            setClientSecret( data.clientSecret );

            // Confirm card payment on the front end
            const cardElement = elements.getElement( CardElement );
            if ( !cardElement ) {
                throw new Error( 'CardElement not found.' );
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: nameOnCard,
                            email: email,
                        },
                    },
                    receipt_email: email,
                }
            );

            if ( error ) {
                console.error( error );
                setStatusMessage( 'Payment failed. Please try again.' );
                setIsSuccess( false );
            } else {
                console.log( 'PaymentIntent:', paymentIntent );
                setStatusMessage(
                    "Your deposit was successful!"
                );
                setIsSuccess( true );

                // Reset fields
                /* setCustomerName( '' );
                setEmail( '' );
                setAmount( '50' );
                setCustomAmount( '' );
                setNameOnCard( '' );
                setSameAsCustomer( true );
                cardElement.clear(); */
            }
        } catch ( error ) {
            console.error( 'Error during payment:', error );
            setStatusMessage( 'Payment failed. Please try again.' );
            setIsSuccess( false );
        } finally {
            setIsLoading( false );
            // Optionally scroll to footer or handle UI
            document.getElementById( 'footer' )?.scrollIntoView( { behavior: 'smooth' } );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">

            <IonItem>
                <IonLabel position="stacked">Customer Name</IonLabel>
                <IonInput
                    type="text"
                    value={customerName}
                    required
                    onIonChange={( e ) => setCustomerName( e.detail.value ?? '' )}
                />
            </IonItem>

            {/* Email */}
            <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                    type="email"
                    value={email}
                    required
                    onIonChange={( e ) => setEmail( e.detail.value ?? '' )}
                />
            </IonItem>

            <IonItem>
                <IonLabel>Select Donation Amount</IonLabel>
                <IonSelect
                    value={amount}
                    placeholder="Select"
                    onIonChange={( e ) => setAmount( e.detail.value )}
                >
                    <IonSelectOption value="50">$50</IonSelectOption>
                    <IonSelectOption value="75">$75</IonSelectOption>
                    <IonSelectOption value="100">$100</IonSelectOption>
                    <IonSelectOption value="125">$125</IonSelectOption>
                    <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
            </IonItem>

            {amount === 'other' && (
                <IonItem>
                    <IonLabel position="stacked">Enter Custom Amount</IonLabel>
                    <IonInput
                        type="text"
                        value={customAmount}
                        required
                        placeholder="0.00"
                        onIonChange={handleCustomAmountChange}
                    />
                </IonItem>
            )}

            <IonItem>
                <IonLabel position="stacked">Name on Card</IonLabel>
                <IonInput
                    type="text"
                    value={nameOnCard}
                    required
                    onIonChange={( e ) => setNameOnCard( e.detail.value ?? '' )}
                />
            </IonItem>

            <IonItem>
                <IonLabel>Payment Information:</IonLabel>
                <div style={{ width: '100%', marginTop: '8px' }}>
                    <CardElement options={cardElementOptions} />
                </div>
            </IonItem>

            <IonButton
                type="submit"
                expand="block"
                disabled={!stripe || isLoading}
                style={{ marginTop: '16px' }}
            >
                {isLoading ? 'Processing...' : 'Deposit'}
            </IonButton>

            {statusMessage && (
                <div
                    className={`status-message ${ isSuccess === true ? 'success' : isSuccess === false ? 'error' : ''
                        }`}
                    style={{ marginTop: '16px' }}
                >
                    {statusMessage}
                </div>
            )}
        </form>
    );
};

export default StripeForm;
