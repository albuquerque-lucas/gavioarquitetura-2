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

export const fetchProjectsList = async (url) => {
  try {
    const response = await axios.get(url);
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
  for (let pair of projectFormData.entries()) {
    console.log('LOG DE SAVEPROJECT');
    console.log(pair[0] + ', ' + pair[1]);
  }
  try {
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost/api/projects/${id}` : 'http://localhost/api/projects';
    projectFormData.append('_method', method);

    const response = await axios.post(url, projectFormData, {
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



