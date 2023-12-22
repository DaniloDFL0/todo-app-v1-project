import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Todos from "./pages/Todos"

import { AppProvider } from "./context/GlobalContext"

const App = () => {
  
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Todos />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </AppProvider>
  )
}

export default App
