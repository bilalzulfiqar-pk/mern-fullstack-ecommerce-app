import { useState } from "react";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import { BrowserRouter } from "react-router-dom";
import Mainpage from "./pages/Mainpage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Menubar />
        <Mainpage />
      </BrowserRouter>
    </>
  );
}

export default App;
