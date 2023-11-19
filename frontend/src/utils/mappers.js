export const mapUpdateField = (field) => {
  switch (field) {
    case 'name':
      return '"nome"';
    case 'area':
      return '"área"';
    case 'category_id':
      return '"categoria"';
    case 'address':
      return '"localização"';
    case 'year':
      return '"data"';
    case 'description':
      return '"descrição"';
    case 'image_url':
      return '"imagem"';
    case 'active_carousel':
      return '"exibir na página inicial"';
    default:
      return '';
  }
}
