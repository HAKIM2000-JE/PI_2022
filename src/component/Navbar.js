import React , {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../image/Departementlogo1blanc.png'
import '../Style/navbar.css'

function Navbar({ Accueil, Notes, Informations, Documents, Stage}) {
    
    
     
    return (
       
        <div>
            <nav class={"navbar navbar-expand-lg navbar-light bg-light"}>
             
                <a class="navbar-brand" href="#"> <img src={logo} alt=""  /></a>
           
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto links">

                      <Link to="/">
                            <li class={"nav-item "+Accueil}>
                                <a class="nav-link" href="#">Accueil <span class="sr-only">(current)</span></a>
                            </li>
                      </Link>
                        

                        <Link to="/notes">
                            <li class={"nav-item " + Notes}>
                                <a class="nav-link" href="#">Notes</a>
                            </li>
                        </Link>

                      
                        
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Informations Utiles
                        </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Personnels administratifs</a>
                                <a class="dropdown-item" href="#">Corps enseignant</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="">Modules enseignés</a>
                            </div>
                        </li>

                        <Link to="/notes">
                            <li class={"nav-item " + Notes}>
                                <a class="nav-link" href="#">Documents </a>
                            </li>
                        </Link>

                       
                        <Link to="/notes">
                            <li class={"nav-item " + Notes}>
                                <a class="nav-link" href="#">Stage</a>
                            </li>
                        </Link>
                       
                        
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
            
        </div>
    )
}

export default Navbar
