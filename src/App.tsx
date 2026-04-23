import './App.css'
import ResultPage from './pages/ResultPage'
import PrintPage from './pages/PrintPage'
import InputPage from './pages/InputPage'
import AppLayout from "./layouts/AppLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/global.scss";
import "./styles/print.scss"


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<InputPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/print" element={<PrintPage />} />

        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
