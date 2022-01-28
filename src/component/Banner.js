import React from 'react'
import  logo  from '../image/Departementlogo1blanc.png'
import logo__université from '../image/université.png'
import logo__emi from '../image/université.png'

import '../Style/banner.css'

function Banner() {
    const phrases = ["An array", "of strings", "to pass the component"]; // Required
    const interval = 3000; // The time to wait before rendering the next string
    const typistProps = {} // Props that are passed to the react-typist component
    const loopPhrases = true // Set to false to stop at last phrase
    return (
        <div className="banner">
            <div className="logo__container">
               <img src={logo} alt="" className="logo__img"/>
            </div>
           
           
            <div className="animated__text">
                <div class="content-slider">
                    <div class="slider">
                        <div class="mask">
                            <ul>
                                <li class="anim1">
                                    <div className="quote">Université Mohammed V de Rabat</div>
                                    
                                </li>
                                <li class="anim2">
                                    <div class="quote">Ecole Mohammadia d'Ingénieurs</div>
                                    
                                </li>
                                <li class="anim3">
                                    <div class="quote">Département Informatque</div>
                                   
                                </li>
                                <li class="anim4">
                                    <div class="quote">Ecole Mohammadia d'Ingénieurs</div>
                                    
                                </li>
                                <li class="anim5">
                                        <div class="quote">Département Informatque</div>
                                   
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
              
            </div>


               <div className="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
               </div>

            <div className="overlay" ></div>
            
        </div>
    )
}

export default Banner
