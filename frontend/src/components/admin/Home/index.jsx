import ManageableCard from "../cards/ManageableCard/ManageableCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faChartBar } from "@fortawesome/free-solid-svg-icons";
import './styles/style.css';
import { Link } from "react-router-dom";

const projectSVG = <FontAwesomeIcon icon={ faBriefcase } />
const categorySVG = <FontAwesomeIcon icon={ faChartBar } />

function Home() {
  return (
    <>
      <div className="text-center my-5">
        <h1>Home page</h1>
      </div>
      <div className="home-card-container container d-flex justify-content-center">
        <ul className="manageable-list list-unstyled my-1">
          <li>
            <Link to='/projects'>
              <ManageableCard icon={ projectSVG } title='Projetos' />
            </Link>
          </li>
          <li>
            <Link to='/categories'>
              <ManageableCard icon={ categorySVG } title='Categorias' />
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Home;