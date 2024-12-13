import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Networks, useIsConnected, XRPLClient } from '@nice-xrpl/react-xrpl';
import { CreateDestinationWallet } from '../../components/create-destination-wallet';
import { CreateSourceWallet } from '../../components/create-source-wallet';
import { DestinationWallet } from '../../components/destination-wallet';
import { SourceWallet } from '../../components/source-wallet';
import './MyWallet.css';

const MyWallet: React.FC = () => {

  /* useEffect( () => {
    axios.get( `${ import.meta.env.VITE_API_URL }/wallet/create` ).then( ( response ) => {
      
    } ).catch( ( error ) => {
      console.error( 'Error: ', error );
    } ).finally( () => {
      console.log( 'Wallet loaded' );
    });
  }, [] ); */


  const MySourceWallet = () => {
    return (
      <div className="WalletWrapper">
        <CreateSourceWallet>
          <SourceWallet />
        </CreateSourceWallet>
      </div> );
  }
      
      

  const MyDestinationWallet = () => {
    return (
      <div className="WalletWrapper">
        <CreateDestinationWallet>
          <DestinationWallet />
        </CreateDestinationWallet> 
      </div> );
  }

  const MainApp = () => {
    // The useIsConnected hook will let you know
    // when the client has connected to the xrpl network
    const isConnected = useIsConnected();

    return (
      <div className="MainApp">
        <div>Connected: {isConnected ? "Yes" : "No"}</div>
      </div>
    );
  }

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
            <IonTitle size="large">My Wallet</IonTitle>
          </IonToolbar>
        </IonHeader>
      
        <div className="container">

          
          <XRPLClient network={Networks.Testnet}>
            <MainApp />
            <MySourceWallet />
          </XRPLClient>

          <XRPLClient network={Networks.Testnet}>
            <MyDestinationWallet />
          </XRPLClient>
  
        </div>

      </IonContent>
    </IonPage>
  );
};

export default MyWallet;
