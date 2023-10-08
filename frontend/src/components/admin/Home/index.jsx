import ManageableCard from "../cards/ManageableCard";

function Home() {
  return (
    <div>
    <div className="text-center my-5">
      <h1>Home page</h1>
    </div>
    <div className="container">
      <ul className="manageable-list list-unstyled">
        <li><ManageableCard /></li>
        <li>Projetos</li>
        <li>Categorias</li>
      </ul>
    </div>
    </div>
  )
}

export default Home;