import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chevronDown, chevronUp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home: React.FC = () => {
  const [ showModal, setShowModal ] = useState( false );

  const toggleModal = () => {
    setShowModal( ( prev ) => !prev );
  };

  useEffect( () => {
    axios.get( `${ import.meta.env.VITE_API_URL }/wallet/create` ).then( ( response ) => {
      
    } ).catch( ( error ) => {
      console.error( 'Error: ', error );
    } ).finally( () => {
      console.log( 'Wallet loaded' );
    });
  }, [] );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="mainContentContainer">
          
          {/* <button className="custom-button" onClick={toggleModal}>     
            {showModal ? 'Close Slide' : 'Open Slide'}

            <IonIcon
              slot="end"
              icon={showModal ? chevronUp : chevronDown}
            />
          </button> */}

          {/* Modal for Bottom Slide */}
          <IonModal
            isOpen={showModal}
            onDidDismiss={() => setShowModal( false )}
            breakpoints={[ 0, 0.5, 1 ]}
            initialBreakpoint={0.5}
            handleBehavior="cycle"
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>Bottom Slide</IonTitle>
                <IonButton slot="end" onClick={() => setShowModal( false )}>
                  Close
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <p style={{ padding: '1em' }}>This is the sliding content!</p>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
