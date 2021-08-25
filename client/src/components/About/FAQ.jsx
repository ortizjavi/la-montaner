import React, { useState } from 'react';
import { Data } from './Data';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveIcon from '@material-ui/icons/Remove';
import smallBeer from '../../img/beerSmall.png';
import './FAQ.css';

const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <div className="container-accordion">
      <div className="accordionSection">
        <div className="container">
          <img src={smallBeer} alt="beerLogo" height="80px" />
          {Data.map((item, index) => {
            return (
              <>
                <div className="wrap" onClick={() => toggle(index)} key={index}>
                  <h1>{item.question}</h1>
                  <span>
                    {clicked === index ? (
                      <RemoveIcon className="icon-accordion" />
                    ) : (
                      <ControlPointIcon className="icon-accordion" />
                    )}
                  </span>
                </div>
                {clicked === index ? (
                  <div className="dropdown">
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
