import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App.jsx"
import "./css/App.css"

import { store } from "./app/store.js"
import { Provider } from "react-redux"
import { fetchUsers } from "./app/features/users/UsersSlice.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
store.dispatch(fetchUsers())
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
