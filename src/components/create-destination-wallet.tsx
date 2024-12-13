import { useCreateAndFundWallet, useCreateWallet, Wallet } from "@nice-xrpl/react-xrpl";
import { useState } from "react";

export function CreateDestinationWallet( { children } ) {
  const [ address, setAddress ] = useState( "" );
  const [ seed, setSeed ] = useState( "" );
  const [ sending, setSending ] = useState( false );

  // When connected to the testnet/dev net, you can
  // use the useCreateWallet series of hooks to create
  // a wallet and fund it from the faucet.
  const createWallet = useCreateWallet();
  const createAndFundWallet = useCreateAndFundWallet();

  // The Wallet component is used when you have
  // credentials. It enables the use of all
  // transactional hooks and all request hooks.

  return seed ? (
    <Wallet seed={seed}>{children}</Wallet>
  ) : (
    <div>
      {!sending ? (
        <button
          onClick={async () => {
            setSending( true );

            const passphrase = '121212';
            const seed = 'asdfasdfasdfasdfasdaf' // sha-256 hash the passphrase and pass it into createWallet() below
            let initialState;

            if ( import.meta.env.VITE_RIPPLE_TESTNET ) {
              initialState = await createAndFundWallet( '100' );
            } else {
              initialState = await createWallet();
            }

            setSending( false );

            if ( initialState?.seed  ) {
              console.log( "created wallet: ", initialState );
              setAddress( initialState.address );
              setSeed( initialState.seed );
            }
          }}
        >
          Create destination wallet
        </button>
      ) : (
        "Creating destination wallet..."
      )}
    </div>
  );
}
