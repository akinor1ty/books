import "../styles/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../services/state";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
