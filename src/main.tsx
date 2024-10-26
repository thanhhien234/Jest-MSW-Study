import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { worker } from './__mocks__/browser';

const root = ReactDOM.createRoot(document.getElementById("root")!);

const mock = async () => {
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
};

mock().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});