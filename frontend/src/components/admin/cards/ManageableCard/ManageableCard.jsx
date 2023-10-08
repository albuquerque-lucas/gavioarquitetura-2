import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import './style/style.css';

const projectSVG = <FontAwesomeIcon icon={faBriefcase} />

export default function ManageableCard(props) {
  return (
    <div className="manageable-card">
      <div
      className="manageable-card-image-container"
      >
        { props.icon }
      </div>
      <div className="manageable-card-title-container">
        <h6>{ props.title }</h6>
      </div>
    </div>
  )
}