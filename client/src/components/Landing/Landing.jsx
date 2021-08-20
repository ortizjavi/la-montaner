import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import logoLanding from "../../img/logoLanding.png";

export default function Landing() {
  return (
    <div className="landing_container">
      <div className="div_content">
        <div class="landing_text">
          <div className="logo_landing">
            <img src={logoLanding} alt="" width="500" height="450" />
          </div>
          <div className="landing_options">
            <h2>¿Sos mayor de edad?</h2>
            <ul className="list_options">
              <li>
                  <Link to="/home">
                    {" "}
                    <button>Si</button>{" "}
                  </Link>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=0qaVdtwbUvo" target='_blank' rel='noopener noreferrer'>
                  <button>No</button>
                </a>
              </li>
            </ul>
            <p>Debés ser mayor de edad para ingresar a nuestra página</p>
            <br/>
          </div>
          <div className="landing_info">
            <p className="text_info_landing">Cerveza 100% artesanal</p>
          </div>
          
          <div className="landing_final">
          <p>Valle de Paravachasca, Córdoba</p>
          </div>
        </div>
      </div>
    </div>
  );
}
