export default function ProjectForm() {
  return (
<form className="p-5 w-50 rounded mb-5 border border-dark d-flex flex-column">
  <select class="form-select mb-1" aria-label="Default select example">
    <option selected>Selecione uma categoria</option>
    <option value="1">Residencial</option>
    <option value="2">Interiores</option>
    <option value="3">Comercial</option>
  </select>
  <div class="mb-1">
    <label for="input-project-name" class="form-label">Nome do projeto</label>
    <input type="text" class="form-control" id="input-project-name"/>
  </div>
  <div className="mb-1">
    <label for="input-project-address" class="form-label">Localização</label>
    <input type="text" class="form-control" id="input-project-address" />
  </div>
  <div class="mb-1 d-flex">
    <div className="area-container mx-1 w-50">
      <label for="input-project-area" class="form-label">Area</label>
      <input type="text" class="form-control" id="input-project-area" />
    </div>
    <div className="date-container mx-1 w-50">
      <label for="input-project-date" class="form-label">Data</label>
      <input type="text" class="form-control" id="input-project-date" />
    </div>
  </div>
  <div class="mb-1">
    <label for="input-project-description" class="form-label">Descrição</label>
    <input type="text" class="form-control" id="input-project-description" />
  </div>
  <div class="mb-1 form-check">
    <label class="form-check-label" for="exampleCheck1">Exibir na pagina principal</label>
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
  </div>
  <div class="mb-3">
    <label for="formFile" class="form-label">Escolher arquivo de capa</label>
    <input class="form-control" type="file" id="formFile" />
  </div>
  <button
  type="submit"
  class="btn btn-dark mt-3 align-self-center w-50"
  >
    Submit
    </button>
</form>
  );
}