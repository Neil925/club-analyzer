import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./shared/Layout";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
