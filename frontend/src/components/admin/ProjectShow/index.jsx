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
import ProjectPicturesForm from '../forms/ProjectPicturesForm';
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
  console.log(projectDetails.images);
  const isImagesEmpty = Array.isArray(projectDetails.images) && projectDetails.images.length === 0;
  return (
    
    <div className="project-show-container">
      <div className="d-flex justify-content-center w-100">
        <div className="project-list-menu bg-dark w-75">
          <Link to="/projects" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      </div>
      {isLoading && <Loading />}
      
      {!isLoading && (
        <div className="container-div text-center my-5">
          <h1>{ projectDetails.name }</h1>
        </div>
      )}



      {!isLoading && (
        <>
          <div className="container-div project-image-container">
            <img src={projectDetails.image_url !== null ? `http://localhost/storage/${projectDetails.image_url}` : noImage} alt="" />
          </div>

          <div className="container-div pd-update project-details-form w-50">
            <ProjectShowTable />
          </div>

          <div className="project-pictures-form-container">
            <ProjectPicturesForm />
          </div>

          <div className="project-pictures-container">
            { !isImagesEmpty ? (
              <ImagesTable images={ projectDetails.images } />
            ) : (
              <h1 className='text-center my-3'>Nenhuma imagem cadastrada</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}
