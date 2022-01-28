import React, { useState } from 'react'
import { Link } from "react-router-dom";
import briefcase from '../image/briefcase.png'
import student from '../image/Student.PNG'
import service from "../image/service.PNG"
import '../Style/card.css'
import AddIcon from '@material-ui/icons/Add';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from 'react-modal';

function AdminCards() {
    const [showModal, setShowModal] = useState(false)

   const [ajout, setAjout] = useState(true)

   const [modif, setModif] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "40%",
            width: "50%"
        }
    };


    

    const ShowAjoutModel = () => {
        setAjout(true)
        setModif(false)
        setShowModal(true)
    }


    const ShowModifModel = ()=>{
        setAjout(false)
        setModif(true)
        setShowModal(true)
    }


    const ShowDeletModel =()=>{
        setAjout(false)
        setModif(false)
        setShowModal(true)
    }

    return (
        <div className="cards__container">
            <h2>Gestions Utilisateurs</h2>
            <p></p>
            <div className="cards">
                s
                    <div className="card" onClick={ShowAjoutModel}>
                        <AddIcon fontSize="large" />

                        <h5 className="card_title">Ajouter un Utilisateurs</h5>
                       
                    </div>
            

                
                    <div className="card" onClick={ShowModifModel}>
                        <AssignmentIndIcon fontSize="large" />
                        <h5 className="card_title">Modifier un utilisateur</h5>
                       
                    </div>

             
             
                    <div className="card"  onClick={ShowDeletModel} >
                        
                        <DeleteIcon fontSize="large" />
                        <h5 className="card_title">Supprimer un utilisateur</h5>
                     
                    </div>
            



            </div>

            <Modal isOpen={showModal} >

              {
                  ajout? (

                        <div className="">
                            <h5>Ajouter  utilisateur </h5>
                            <hr />

                        <form>
                            <div class="form-group">
                                    <label for="exampleInputEmail1">Nom</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  />
                                    <label for="exampleInputEmail1">Prenom</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  />
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <label for="exampleInputEmail1">Tel</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <select id="typeDocument" name="typeDocument" required>

                                        <option value="AUTRE">Statut</option>
                                        <option value="EMPLOI_DU_TEMPS">Etudiant </option>
                                        <option value="NOTES_SEMINAIRE">Enseignnat</option>

                                    </select>
                                 </div>
                                    
                                        
                             </form>

                            <hr />
                         
                         
                            <div>
                                <label for="formFileLg" class="form-label"> Importer un fichier csv (plusieurs Utilisateurs à la fois)</label>
                                <input class="form-control form-control-lg" id="formFileLg" type="file" />
                            </div>

                            <br /><br />
                            <div className="">
                                <div className="row row-btn">

                                    <input type="button" className="annuler" onClick={() => (setShowModal(false))} value="Annuler" />
                                    <input type="button" className="submit" value="Ajouter" />

                                </div>
                            </div>

                    </div>
                      
                  ): modif ? (
                      <div className="">
                                <h5>Modifier  utilisateur </h5>
                                <hr />

                                <div class="form-group">
                                    <select id="typeDocument" name="typeDocument" required>

                                        <option value="AUTRE">Type Utilisateur</option>
                                        <option value="EMPLOI_DU_TEMPS">Etudiant </option>
                                        <option value="NOTES_SEMINAIRE">Enseignnat</option>
                                        
                                    </select>
                                </div>


                                <hr />
                                <form>
                                    <div class="form-group">
                                      
                                        <label for="exampleInputEmail1">Email Utilisateur</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <label for="exampleInputEmail1">Tel</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <select id="typeDocument" name="typeDocument" required>

                                            <option value="AUTRE">Champs à modifier</option>
                                            <option value="EMPLOI_DU_TEMPS">Nom</option>
                                            <option value="NOTES_SEMINAIRE">Prenom</option>
                                            <option value="NOTES_SEMINAIRE">Email</option>
                                            <option value="NOTES_SEMINAIRE">Tel</option>
                                            <option value="NOTES_SEMINAIRE">Statut</option>

                                        </select>
                                    </div>
                                    <label for="exampleInputEmail1">Nouvelle valeur</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <hr />

                                    <a href="">Modifier un autre champs</a>


                                </form>


                                <br /><br />
                                <div className="">
                                    <div className="row row-btn">

                                        <input type="button" className="annuler" onClick={() => (setShowModal(false))} value="Annuler" />
                                        <input type="button" className="submit" value="Modifier" />

                                    </div>
                                </div>


                         
                      </div>
                    
                  ): (
                                <div className="">
                                    <h5>Supprimer  utilisateur </h5>
                                    <hr />

                                    <div class="form-group">
                                        <select id="typeDocument" name="typeDocument" required>

                                            <option value="AUTRE">Type Utilisateur</option>
                                            <option value="EMPLOI_DU_TEMPS">Etudiant </option>
                                            <option value="NOTES_SEMINAIRE">Enseignnat</option>

                                        </select>
                                    </div>


                                    <hr />
                                    <form>
                                        <div class="form-group">

                                            <label for="exampleInputEmail1">Email Utilisateur</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            
                                        </div>
                                        

                                        <a href="">Supprimer  un autre Utilisateur</a>


                                    </form>
                                    <br /><br />
                                    <div className="">
                                        <div className="row row-btn">

                                            <input type="button" className="annuler" onClick={() => (setShowModal(false))} value="Annuler" />
                                            <input type="button" className="submit" value="Supprimer" />

                                        </div>
                                    </div>



                                </div>
                  )

                  
              }
               
               
            

              

                    

            </Modal>
 


        </div>
    )

}

export default AdminCards
