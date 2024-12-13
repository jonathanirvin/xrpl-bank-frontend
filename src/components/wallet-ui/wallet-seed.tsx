import { useWallet } from "@nice-xrpl/react-xrpl";

export function WalletSeed() {
  // The useWallet hook gives you direct access to the
  // raw xrpl wallet - from here you can grab the seed
  // or any other information.
  const wallet = useWallet();

  return <div className="WalletRow">Seed: {wallet.seed}</div>;
}
