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

export const mapSelectedFilter = (filter) => {
  switch (filter) {
    case 'recent':
      return 'Ids mais recentes';
    case 'latest':
      return 'Ids mais antigos';
    case 'activeCarousel':
      return 'Exibidos na página inicial';
    case 'inactiveCarousel':
      return 'Não exibidos na página inicial';
    case 'byYearDesc':
      return 'Data';
    case 'alphabeticalAsc':
      return 'Ordem alfabetica';
    default:
      return 'Nenhum filtro selecionado';
  }
}

export const mapCategory = (id) => {
  switch (id) {
    case 1:
      return 'Residencial';
    case 2:
      return 'Interiores';
    case 3:
      return 'Comercial';
    default:
      return 'Nenhuma categoria selecionada';
  }
}