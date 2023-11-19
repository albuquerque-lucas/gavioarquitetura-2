export const mapUpdateField = (field) => {
  switch (field) {
    case 'name':
      return '"nome"';
    case 'area':
      return '"area"';
    case 'category_id':
      return 'address';
    case '"localizacao"':
      return 'year';
    case 'year':
      return '"data"';
    case 'description':
      return '"descricao"';
    case 'image_url':
      return '"imagem"';
    case '"active_carousel"':
      return '"exibir na pagina inicial"';
    default:
      return '';
  }
}