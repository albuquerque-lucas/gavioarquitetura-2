import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategoriesList } from "../../../../utils/CategoriesFetch";
import { saveProject } from "../../../../utils/ProjectsFetch";
import CategoriesContext from "../../../../context/CategoriesContext/CategoriesContext";
import ProjectsContext from "../../../../context/ProjectsContext/ProjectsContext";

export default function ProjectForm() {
  const { categoriesList, setCategoriesList } = useContext(CategoriesContext);
  const { projectFormData, setProjectFormData } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectFormData({
      ...projectFormData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    console.log(files);
    setProjectFormData({
      ...projectFormData,
      image_url: files[0],
    });
  }

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;

    setProjectFormData({
      ...projectFormData,
      active_carousel: checked,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(projectFormData);
    try {
      const data = await saveProject(projectFormData);

      console.log('Projeto enviado com sucesso!');
      console.log(data);
      navigate('/projects');
    } catch (error) {
      console.error('Erro ao enviar o projeto:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategoriesList();
        setCategoriesList(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setCategoriesList([]);
      }
    };
    fetchData();
  }, [setCategoriesList]);
  return (
    <form
      className="p-5 w-50 rounded mb-5 border border-dark d-flex flex-column"
      onSubmit={(e) => submitForm(e)}
      encType='multipart/form-data'
      method="POST"
    >
      <select
        className="form-select mb-3"
        name="category_id"
        value={ projectFormData.category_id }
        onChange={(e) => handleChange(e)}
      >
          <option defaultValue>Selecione uma categoria</option>
        {
          categoriesList.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          )
          )
        }
      </select>
      <div className="mb-1">
        <label htmlFor="input-project-name" className="form-label">Nome do projeto</label>
        <input
          type="text"
          className="form-control"
          id="input-project-name"
          name="name"
          value={ projectFormData.name }
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-1">
        <label htmlFor="input-project-address" className="form-label">Localização</label>
        <input
          type="text"
          className="form-control"
          id="input-project-address"
          name="address"
          value={ projectFormData.address }
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-1 d-flex">
        <div className="area-container mx-1 w-50">
          <label htmlFor="input-project-area" className="form-label">Área</label>
          <input
            type="text"
            className="form-control"
            id="input-project-area"
            name="area"
            value={ projectFormData.area }
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="date-container mx-1 w-50">
          <label htmlFor="input-project-date" className="form-label">Data</label>
          <input
            type="text"
            className="form-control"
            id="input-project-year"
            name="year"
            value={ projectFormData.year }
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="mb-1">
        <label htmlFor="input-project-description" className="form-label">Descrição</label>
        <input
          type="text"
          className="form-control"
          id="input-project-description"
          name="description"
          value={ projectFormData.description }
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-1 form-check">
        <label className="form-check-label fw-bold" htmlFor="input-project-active-carousel">Exibir na página principal</label>
        <input
          type="checkbox"
          className="form-check-input border border-dark"
          id="input-project-active-carousel"
          checked={projectFormData.active_carousel}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Escolher arquivo de capa</label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          name="image_url"
          files={ projectFormData.image_url }
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-dark mt-3 align-self-center w-50"
      >
        Submit
      </button>
    </form>
  );
}
