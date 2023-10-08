import ProjectItem from "./project-item";

export default function ProjectTable() {
  return (
    <table className="table table-hover table-bordered mt-3 w-75">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Area</th>
                <th>Imagem</th>
                <th>Editar / Excluir</th>
              </tr>
            </thead>
            <tbody>
              <ProjectItem />
            </tbody>
          </table>
  );
}