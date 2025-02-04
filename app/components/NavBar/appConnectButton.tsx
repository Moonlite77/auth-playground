import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/components/thirdweb/client"
import {
    generatePayload,
    isLoggedIn,
    login,
    logout,
  } from "@/app/actions/login"




  export default function AppConnectButton(){
    return(
        <ConnectButton
      client={client}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) =>
          generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
    )
  }