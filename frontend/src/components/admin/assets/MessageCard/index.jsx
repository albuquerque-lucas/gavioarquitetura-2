import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import ProjectsContext from '../../../../context/ProjectsContext/ProjectsContext';
import './styles/style.css';

export default function MessageCard({ message }) {

  const checkSVG = <FontAwesomeIcon icon={ faCheckCircle } />;

  return (
      <div id="message-card" className='row'>
        <div className="col-2 message-content message-icon">
          { checkSVG }
        </div>
        <div className="message-content col-8 message-content">
          { message }
        </div>
      </div>
  );
}