import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProject } from '../../../../utils/ProjectsFetch';
// import Loading from '../../assets/Loading';
// import noImage from '../../../../images/projects/no-image.jpg';
// import ImagesTable from './ImagesTable';
// import ProjectShowTable from './ProjectShowTable';
// import ProjectPicturesForm from './ProjectPicturesForm';
import MessageCard from '../../assets/MessageCard';
import { Link } from 'react-router-dom';

export default function ProjectShow() {
  const { id } = useParams();
  const { setProjectDetails, projectDetails } = useContext(ProjectsContext);
  const { isLoading, setIsLoading } = useContext(GeneralDataContext);

  const fetchProjectDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchProject(id);
      setProjectDetails(data);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setProjectDetails, id, setIsLoading]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);
  return (
    
    <div id="project-show-container">
      <div className="d-flex justify-content-center w-100">
        <div className="project-list-menu bg-dark w-75">
          <Link to="/projects" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </div>
      <div className="message-container">
        <MessageCard />
      </div>
      <div className="project-show-container">
        <div id="image-container">
          <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="" />
        </div>
      </div>
    </div>

  );
}
