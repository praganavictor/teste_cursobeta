import React from "react";
import { Provider } from "react-redux";

import "./styles/global.css";

import store from "./store";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
