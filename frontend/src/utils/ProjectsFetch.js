export const fetchProject = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1/api/projects/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    throw error;
  }
};

export const fetchProjectsList = async () => {
  try {
    const response = await fetch('http://127.0.0.1/api/projects');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw error;
  }
};