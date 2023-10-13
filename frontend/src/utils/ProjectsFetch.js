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

export const fetchNewProject = async (projectFormData) => {
  try {
    const formData = new FormData();
    formData.append('name', projectFormData.name);
    formData.append('description', projectFormData.description);
    formData.append('area', projectFormData.area);
    formData.append('year', projectFormData.year);
    formData.append('address', projectFormData.address);
    formData.append('category_id', projectFormData.category_id);
    formData.append('active_carousel', projectFormData.active_carousel ? 1 : 0);
    formData.append('image_url', projectFormData.image_url);

    const response = await axios.post('http://localhost/api/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar o projeto:', error);
    throw error;
  }
};

// export const fetchNewProject = async (projectData) => {
//   try {
//     const response = await axios.post('http://localhost/api/projects', projectData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao enviar o projeto:', error);
//     throw error;
//   }
// };
