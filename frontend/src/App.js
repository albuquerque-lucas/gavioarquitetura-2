import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/admin/Header';
import Body from './components/admin/Body';
import Projects from './components/admin/Projects';
import Home from './components/admin/HomePage';
import Layout from './components/admin/Layout';
import Categories from './components/admin/Categories';
import ProjectShow from './components/admin/ProjectShow';
import NewProject from './components/admin/NewProject';

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
