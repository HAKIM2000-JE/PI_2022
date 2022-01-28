import React ,{useState} from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import '../Style/commentaire.css';
import {  useHistory } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Modal from 'react-modal';


function Commentaire({ text, time, numerocommentaire}) {
 
   
    const [classe, setclasse] = useState("note__options__list_hiden")
    const [editedComment, setEditedComment] = useState(text)
    const [showModal, setShowModal] = useState(false)
 

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "40%",
            width :"50%"
        }
    };

    // gestion d'affichage menu modification et suppression commentaire
    const ShowMenu = () => {
        
        if (classe == "note__options__list_hiden") {
            setclasse("note__options__list")

        } else {
            setclasse("note__options__list_hiden")

        }



    }

    // Modification du commentaire par numerocommentaire

    const ModifierCommentaire = (event) => {
       
 

       

        

        axios.put(`http://localhost:8081/commentaire/edit/${numerocommentaire}`,
            {


                "text": editedComment,
                
                

            },
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        setShowModal(false)
            // Auto refresh de la page 
        window.location.reload()
    };
 
     // Suppression du commentaire par numerocommentaire

    const deletecommentaire = () => {
        axios.delete(`http://localhost:8081/commentaire/delete/${numerocommentaire}`
        ).then(res => {
            //console.log(res.data[0].titre);
            //Parse if it a json object
            console.log(res)
         

        });

        // Auto refresh de la page 

        window.location.reload()
      

    }

    return (
        <div className="commentaire">
            <div className="commentaire__body">
                <div className="commentaire__body__head">
                    <div className="commentaire__account">

                        <AccountCircleIcon className="commentaire__account__avatar" style={{ fontSize: 50 }} />
                        <div className="">
                            <h6 className="commentaire__account__name" >Undifined</h6>

                            {/*<span className="notedetail__account__post">Chef du Département</span>*/}



                            <span className="commentaire__time">{time}</span>


                        </div>
                        <div className="comentaire__title__time__right">
                            <MoreVertIcon onClick={ShowMenu}  />
                            <div className="commentaire__options">
                                <ul className={`${classe}`}>
                                    <li>
                                        <span onClick={()=>{setShowModal(true)}} >Modifier</span>

                                    </li>
                                    <li onClick={deletecommentaire}>
                                        <span >Supprimer</span>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={showModal} style={customStyles}>
                  <h5>Modifier votre commentaire </h5>
                  <hr/>
                  <textarea value={editedComment} onChange={e=>{setEditedComment(e.target.value)}} />
                    <br /> <br /><br />
                    <div className="row row-btn">

                        <input type="button" className="annuler" onClick={()=>{setShowModal(false)}} value="Annuler" />


                        <input type="button" className="submit" onClick={ModifierCommentaire} value="Modifier" />

                    </div>

                  
                </Modal>
               


              

                <div className="commentaire__message">
                    <p className="commentaire__message__text">{text}</p>

                   
                 
                </div>
            </div>


            <hr/>
            
        </div>
    )
}

export default Commentaire
