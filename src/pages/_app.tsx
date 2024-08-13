import "@/styles/globals.css";
import "../../public/css/theme.css";
import "../../public/css/maicons.css";
import "../../public/css/bootstrap.css";

import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
