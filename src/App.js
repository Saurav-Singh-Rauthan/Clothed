import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from './components/Pages/Home/Home';
import Notfound from './components/Pages/Notfound/Notfound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="body">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<Notfound/>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
