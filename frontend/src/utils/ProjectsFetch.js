import axios from 'axios';

export const fetchById = async (id) => {
  try {
    const response = await axios.get(`http://localhost/api/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    throw error;
  }
};

export const fetchProjects = async (
  url,
  order='desc',
  hasAttribute = true,
  attribute = 'id',
  categoryId = null) => {
  try {
    console.log('HAS ATTRIBUTE', hasAttribute);
    const response = await axios.get(url, {
      params: { order, hasAttribute, attribute, categoryId },
    });

    console.log('RESPONSE', response);
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`http://localhost/api/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    throw error;
  }
};

export const saveProject = async (projectFormData, id = null) => {
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

export const fetchByCategory = async (id) => {
  try {
    const response = await axios.get(`http://localhost/api/projects/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos por categoria:', error);
    throw error;
  }
}

export const fetchProjectImages = async (id, order = 'desc') => {
  try {
    const response = await axios.get(`http://localhost/api/projects/images/${id}?order=${order}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as imagens do projeto:', error);
  }
}

export const deleteImage = async (id) => {
  try {
    const response = await axios.delete(`http://localhost/api/projects/images/delete/${id}`);
    return response.data;

  } catch (error) {
    console.error('Erro ao deletar imagem,', error);
  }
}

export const deleteSelectedImages = async (imageList) => {
  try {
    const selectedImageIds = imageList
    .filter((image) => image.selected)
    .map((image) => image.id);

  const response = await axios.delete('http://localhost/api/projects/images/delete-multiple', {
    data: { image_ids: selectedImageIds },
  });
  console.log('Imagens deletadas com sucesso.');
  return response.data;
  } catch (error) {
    console.error('Erro ao tentar deletar as imagens.', error);
  }
}

export const saveProjectImages = async (projectId, imageFiles) => {
  console.log('ID DO PROJETO', projectId);
  try {
    const url = `http://localhost/api/projects/images/${projectId}`;
    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('imageFiles[]', imageFiles[i]);
    }

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao salvar as imagens do projeto:', error);
    throw error;
  }
};



