import { useState } from "react";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import { BrowserRouter } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Footer from "./components/Footer";
import NewsletterSection from "./components/NewsletterSection";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Menubar />
        <Mainpage />
        <NewsletterSection />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
