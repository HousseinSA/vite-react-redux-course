import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App.jsx"
import "./css/App.css"

import { store } from "./app/store.js"
import { Provider } from "react-redux"
import { fetchUsers } from "./app/features/users/UsersSlice.jsx"
store.dispatch(fetchUsers())  
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
