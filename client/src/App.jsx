import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Coment from './pages/Coment/Coment.jsx'
import AddComent from './pages/AddComent/AddComent.jsx'

function App() {
  return (
    <div className="appContainer">
      <Header />

      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/comments" element={<Coment />} />
          <Route path="/add-comment" element={<AddComent />} />

        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
