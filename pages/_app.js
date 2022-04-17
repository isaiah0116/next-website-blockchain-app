import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { moralisAppID, moralisServerURL } from "../config";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={moralisAppID} serverUrl={moralisServerURL}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
