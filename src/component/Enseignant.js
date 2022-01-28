
import React, { useRef } from 'react'
import earth_vd from '../image/bg-video.mp4'
import '../Style/enseignant.css'
import Auth from './Auth'
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
function Enseignant() {
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    return (
        <div className="enseignant">
            <video   loop	autoPlay id="myVideo">
                <source src={earth_vd} type="video/mp4"/>
           </video>

               
         <div class="content">
                    <h1>Espace Enseignant</h1>
                   
            
                <button id="myBtn" onClick={executeScroll}>Se Connecter</button>
      
         </div>

            <div ref={myRef} className="div"></div>
            <Auth  id="auth"/>
            
        </div>
    )
}

export default Enseignant
