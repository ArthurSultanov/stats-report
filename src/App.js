import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './pages/table';
import Template_table from './pages/template_table';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Template_table/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
  )
}

export default App;
