import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={"HPqe3okZh1D0Yrzi7tydb8Yqq6T0WFJaXipvu0iA"} //process.env.NEXT_PUBLIC_APP_ID
      serverUrl={"https://x3ndg09zcrzz.usemoralis.com:2053/server"} //process.env.NEXT_PUBLIC_SERVER_URL
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );  
}

export default MyApp
