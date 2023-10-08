import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const projectSVG = <FontAwesomeIcon icon={faBriefcase} />

export default function ManageableCard() {
  return (
    <div>
      <div className="manageable-card-image-container">
        { projectSVG }
      </div>
    </div>
  )
}