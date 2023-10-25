import { useState } from "react";
import { Provider } from "jotai";
import "./App.css";
import Dag from "./components/Dag";

function App() {
  return (
    <>
      <Provider>
        <Dag />
      </Provider>
    </>
  );
}

export default App;
