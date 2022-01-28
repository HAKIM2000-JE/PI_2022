import React from "react";
import logo from '../image/Departementlogo1blanc.png'

import "../Style/footer.css"; 
function Footer() {
    return (
        <div className="footer">
            <footer>
                <div class="container-fluid padding">
                    <div class="row text-center">
                        <div class="col-md-4">


                            <hr class="light" id="lk" />
                            <img src={logo} className="logo__img"  alt=""/>
                            <p id="pk">Département Informatique EMI</p>



                        </div>
                        
                        <div class="col-md-4">
                            <hr className="light"  />
                            <div className="" id="lk">
                                <p>BP 765, Avenue Ibn Sina Agdal Rabat Maroc</p>
                                <p>Phone: (+212) 684 25 78 02</p>
                                <p>Email: ginf@emi.ac.ma</p>
                            </div>
                            

                        </div>


                    </div>

                </div>
            </footer>
        </div>
    );
}

export default Footer;
