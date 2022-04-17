import './App.css';
import LoginView from './Pages/Login';
import RiskList from './Pages/Risk';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DefenseProfil from './Pages/DefenseProfil';
import CreateRisk from './Pages/CreateRisk';
import CreateDefenseProfil from './Pages/CreateDefenseProfil';
import Users from './Pages/Users';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/risks" element={<RiskList />} />
        <Route path="/defense-profil" element={<DefenseProfil />} />
        <Route path="/risk" element={<CreateRisk />} />
        <Route path="/post-defense" element={<CreateDefenseProfil />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
