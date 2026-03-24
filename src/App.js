import "@/App.css";
import "@/styles/main.css";
import "@/styles/hero-redesign.css";
import "@/styles/apple-improvements.css";
import "@/styles/responsive-improvements.css";
import "@/styles/pages.css";
import "@/styles/new-sections.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Packs from "@/pages/Packs";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Legal from "@/pages/Legal";
import Privacy from "@/pages/Privacy";
import Reviews from "@/pages/Reviews";
import { Toaster } from "@/components/ui/sonner";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packs" element={<Packs />} />
            <Route path="/pourquoi-nous" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/avis" element={<Reviews />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/politique-confidentialite" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
