import React, { useCallback, useEffect, useContext } from 'react';
import './styles/style.css';
import { useParams } from 'react-router-dom';
import ProjectsContext from '../../../context/ProjectsContext/ProjectsContext';
import GeneralDataContext from '../../../context/GeneralDataContext/GeneralDataContext';
import { fetchProject } from '../../../utils/ProjectsFetch';
import Loading from '../cards/Loading';
import noImage from '../../../images/projects/no-image.jpg';
import ImagesTable from '../tables/ImagesTable';
import ProjectShowTable from '../tables/ProjectShowTable';

export default function ProjectShow() {
  const { id } = useParams();
  const { setProjectDetails } = useContext(ProjectsContext);
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
    <div className='project-show-container'>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="container-div text-center my-5">
          <h1>Project Show</h1>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="container-div project-image-container">
            <img src={ noImage } alt="" />
          </div>

          <div className="container-div pd-update project-details-form w-50">
            <ProjectShowTable />
          </div>

          <div className="project-pictures-container">
            <ImagesTable />
            <h1>Nenhuma imagem cadastrada</h1>
          </div>
        </>
      )}
    </div>
  );
}
