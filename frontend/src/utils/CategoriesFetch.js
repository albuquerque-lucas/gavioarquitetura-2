export const fetchCategory = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1/api/categories/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    throw error;
  }
};

export const fetchCategoriesList = async () => {
  try {
    const response = await fetch('http://127.0.0.1/api/categories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    throw error;
  }
};