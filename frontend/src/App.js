import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/admin/pages/Header';
import Body from './components/admin/pages/Body';
import Projects from './components/admin/pages/Projects';
import Home from './components/admin/pages/HomePage';
import Layout from './components/admin/pages/Layout';
import Categories from './components/admin/pages/Categories';
import ProjectShow from './components/admin/pages/ProjectShow';
import NewProject from './components/admin/pages/NewProject';

function App() {
  return (
    <main>
      <Layout>
        <Header />
        <Body>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectShow />} />
            <Route path="/projects/new-project" element={<NewProject />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Body>
      </Layout>
    </main>
  );
}

export default App;
