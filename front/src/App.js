import './App.css';
import LoginView from './Pages/Login';
import NoteView from './Pages/Risk';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefenseProfil from './Pages/DefenseProfil';
import CreateRisk from './Pages/CreateRisk';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/risks" element={<NoteView />} />
        <Route path="/defense-profil" element={<DefenseProfil />} />
        <Route path="/risk" element={<CreateRisk />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
