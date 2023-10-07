import './App.css';
import { Route, Routes } from 'react-router-dom';
import Projects from './components/admin/projects';
import Home from './components/admin/home';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </main>
  );
}

export default App;
