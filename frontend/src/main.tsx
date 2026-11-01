import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Agentation } from "agentation"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {process.env.NODE_ENV === "development" && (
      <Agentation endpoint="http://localhost:4747" />
    )}
  </React.StrictMode>,
)
