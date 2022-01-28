
import React, { useRef } from 'react'


import Auth from './Auth'
import "../Style/eleve.css";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

    
function Eleve() {
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    return (
        <div className="eleve">
            
             


            <div class="eleve__content">
                <div className="eleve__content_text">
                    <h1>Espace Eleve</h1>


                    <button id="myBtn" onClick={executeScroll}>Se Connecter</button>
                </div>
                 
               
                <div className="overlay" ></div>
            </div>
            
            <div ref={myRef} className="div"></div>
            <Auth id="auth" />

        </div>
    )
}

export default Eleve
