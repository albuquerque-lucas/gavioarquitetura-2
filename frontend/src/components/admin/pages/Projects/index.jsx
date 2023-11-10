import React from 'react';
import { Link } from 'react-router-dom';
import MessageCard from '../../assets/MessageCard';
import './styles/style.css';

export default function Projects() {
  return (
    <div id='project-list-container'>
      <div className="text-center my-5">
        <h1>Projetos</h1>
      </div>
        <div className="project-list-menu bg-dark w-75">
          <Link to="/projects/new-project" className="btn btn-dark">
            Novo projeto
          </Link>
        </div>
      <div className="message-container">
        <MessageCard />
      </div>
      <div id="project-table-container">
        <table id="project-table-admin">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Imagens</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Projeto 1</td>
              <td>Descricao Projeto 1</td>
              <td>Imagem Projeto 1</td>
              <td>Editar</td>
              <td>Excluir</td>
            </tr>
            <tr>
              <td>Projeto 2</td>
              <td>Descricao Projeto 2</td>
              <td>Imagem Projeto 2</td>
              <td>Editar</td>
              <td>Excluir</td>
            </tr>
            <tr>
              <td>Projeto 3</td>
              <td>Descricao Projeto 3</td>
              <td>Imagem Projeto 3</td>
              <td>Editar</td>
              <td>Excluir</td>
            </tr>
            <tr>
              <td>Projeto 4</td>
              <td>Descricao Projeto 4</td>
              <td>Imagem Projeto 4</td>
              <td>Editar</td>
              <td>Excluir</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
