import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './styles/style.css';

export default function MessageCard() {

  const checkSVG = <FontAwesomeIcon icon={ faCheckCircle } />;


  return (
      <div id="message-card" className='row'>
        <div className="col-2 message-content message-icon">
          { checkSVG }
        </div>
        <div className="message-content col-8 message-content">
          Campo alterado com sucesso!
        </div>
      </div>
  );
}