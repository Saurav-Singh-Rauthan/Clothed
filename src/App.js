import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home/Home";
import Shorts from "./components/Pages/Shorts/Shorts";
import Shirts from "./components/Pages/Shirts/Shirts";
import Jeans from "./components/Pages/Jeans/Jeans";
import Shoes from "./components/Pages/Shoes/Shoes";
import Notfound from "./components/Pages/Notfound/Notfound";
import Auth from "./components/Pages/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="body">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/shirts" element={<Shirts />} />
            <Route path="/jeans" element={<Jeans />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
