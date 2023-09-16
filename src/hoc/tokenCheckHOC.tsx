import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const TokenCheckHOC = (WrappedComponent: any) =>
  function Comp(props: any) {
    const [hasAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
      isMetamask();
    }, []);

    const isMetamask = async () => {

      checkWalletConnection();
      window.ethereum.on("accountsChanged", checkWalletConnection);
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          checkWalletConnection
        );
      };
    };

    const checkWalletConnection = () => {
      console.log("here")
      console.log(window.ethereum.selectedAddress)
      if (!window.ethereum.selectedAddress) {
        console.log("Wallet disconnected");
        // Perform actions here
      }
    };


    const checkWalletAdress = () => {
      console.log(window.ethereum.selectedAddress)
    }

    return <>{!hasAuthorized && <WrappedComponent {...props} />}</>;
  };

export { TokenCheckHOC };
