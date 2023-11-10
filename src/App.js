import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Template_table from './pages/template_table';
import { GlobalContextProvider } from './context/context';
import Experince from './pages/Experince';
import Inv from './pages/Inv';
import Eduction from './pages/Eduction';
import Contingent from './pages/Contingent';

function App() {
  return (
    <GlobalContextProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Template_table/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/experience" element={<Experince/>} />
            <Route path="/invalid" element={<Inv/>} />
            <Route path="/eductions" element={<Eduction/>} />
            <Route path="/contingent" element={<Contingent/>} />
          </Routes>
      </Router>
    </GlobalContextProvider>
  )
}

export default App;
