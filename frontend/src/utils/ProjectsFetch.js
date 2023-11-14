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
  ('chegou aqui');
  try {
    const response = await axios.delete(`http://localhost/api/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    throw error;
  }
};

export const saveProject = async (projectFormData, id = null) => {
  console.log('Project Form Data', projectFormData);
  try {
    const formData = new FormData();

    for (const field in projectFormData) {
      if (projectFormData[field] !== null && projectFormData[field] !== '') {
        formData.append(field, projectFormData[field]);
      } else {
        throw new Error(`O campo ${field} nao pode estar vazio!`);
      }
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

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

    return response.data;
  } catch (error) {
    console.error(`Erro ao ${id ? 'atualizar' : 'enviar'} o projeto:`, error);
    throw error;
  }
};



