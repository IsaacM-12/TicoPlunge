import "./App.css";
import { BrowserRouter, Form, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Forms from "./Views/Feedback/Feedback";

function App() {
  function NotFound() {
    return (
      <div className="NotFound">
        <div>
          <h1>La página que busca no existe</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Forms />} />
            <Route path="/Feedback" element={<Forms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
