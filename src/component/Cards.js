import React from 'react'
import { Link } from "react-router-dom";
import briefcase from '../image/briefcase.png'
import student from '../image/Student.PNG'
import service from "../image/service.PNG"
import '../Style/card.css'

function Cards() {
    return (
        <div className="cards__container">
          <h2>Comptes Utilisateurs</h2>
            <p>Accéder aux pages internes</p>
            <div className="cards">
               <Link to="Eleve">
                    <div className="card">
                        <img src={student} alt="" className="card__icon" />
                        <h5 className="card_title">Espace Elève</h5>
                        <p className="card__login">Login</p>
                    </div>
               </Link>
               
            <Link to="/Enseignant">
                <div className="card">
                    <img src={briefcase} alt="" className="card__icon" />
                    <h5 className="card_title">Espace Enseignant</h5>
                    <p className="card__login">Login</p>
                </div>

          </Link>

          <Link>
                    <div className="card">
                        <img src={service} alt="" className="card__icon" />
                        <h5 className="card_title">Service et Maintenance</h5>
                        <p className="card__login">Login</p>
                    </div>
          </Link>
               


            </div>
   

        </div>
    )
        
}

export default Cards
