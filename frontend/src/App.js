import './App.css';
import { Route, Routes } from 'react-router-dom';
import Projects from './components/admin/projects';
import Home from './components/admin/home';
import Layout from './components/admin/Layout';

function App() {
  return (
    <main>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
