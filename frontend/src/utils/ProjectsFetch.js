import axios from 'axios';

export const fetchProject = async (id) => {
  try {
    const response = await axios.get(`http://localhost/api/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    throw error;
  }
};

export const fetchProjectsList = async () => {
  try {
    const response = await axios.get('http://localhost/api/projects');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  console.log('chegou aqui');
  try {
    const response = await axios.delete(`http://localhost/api/projects/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    throw error;
  }
};

export const saveProject = async (projectFormData, id = null) => {
  console.log(projectFormData);
  console.log(id);
  try {
    const formData = new FormData();
    formData.append('name', projectFormData.name);
    formData.append('description', projectFormData.description);
    formData.append('area', projectFormData.area);
    formData.append('year', projectFormData.year);
    formData.append('address', projectFormData.address);
    formData.append('category_id', projectFormData.category_id);
    formData.append('active_carousel', projectFormData.active_carousel ? 1 : 0);

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost/api/projects/${id}` : 'http://localhost/api/projects';
    formData.append('_method', method);

    if (projectFormData.image_url) {
      formData.append('image_url', projectFormData.image_url);
    }

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    console.log(method);
    return response.data;
  } catch (error) {
    console.error(`Erro ao ${id ? 'atualizar' : 'enviar'} o projeto:`, error);
    throw error;
  }
};


