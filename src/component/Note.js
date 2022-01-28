
import React, { useEffect, useState, useRef } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withRouter, useHistory } from "react-router-dom";

import '../Style/notes.css'
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';
import { useStateValue } from "../StateProvider";
import '../Style/note.css'


import '../Style/NouveauDocument.css';


import useForceUpdate from 'use-force-update';

var encoder = require('int-encoder');
encoder.alphabet('0123456789abcdef')

function Note({ titre__note, description__note, lastUpdate__note, type__note, id__note}) {
    const history = useHistory();

    const [classe, setclasse] = useState("note__options__list_hiden")
    // note_id contient la valeur id de la note courante 
    const [{ note_id}, dispatch] = useStateValue();
   
  
    const [nouveauDocument, setNouveauDocument] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [promotion, setPromotion] = useState("Premiere Annee");
    const [typeDocument, setTypeDocument] = useState(type__note);
    const [document, setDocument] = useState(null);
    const [typeDoc, setTypeDoc] = useState("Emploi du temps")
    const [titre, setTitre] = useState(titre__note);
    const [deleteModal, setDeleteModal] = useState(false)
    const [description, setDescription] = useState(description__note);


    const wrraper_ref = useRef(null)

    const forceUpdate = useForceUpdate();



    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "35%",
            width: "50%"
        }
    };



    const openModal = () => {
      
        switch (typeDocument) {
            case "EMPLOI_DU_TEMPS":
                setTypeDoc("Emploi du temps")
                break

            case "NOTES_SEMINAIRE":
                setTypeDoc("Note de seminaire")
                break

            case "NOTES_EVENEMENT":
                setTypeDoc("Note d'evenement")
                break

            case "NOTES_DE_SORTIE":
                setTypeDoc("Note de sortie")
                break

            case "REPPORT_DU_COURS":
                setTypeDoc("Repport du cours")
                break
            case "AUTRE":
                setTypeDoc("Autre")
                break

            default:
                setTypeDoc('');
        }
        setNouveauDocument(true);
    };


    const closeModal = () => {
        setNouveauDocument(false);
        setPromotions([
            { id: 1, value: "Premiere Annee", isChecked: false, semestre: { S1: false, S2: false } },
            { id: 2, value: "Deuxieme Annee", isChecked: false, semestre: { S3: false, S4: false } },
            { id: 3, value: "Troisieme Annee", isChecked: false, semestre: { S5: false } },
        ]);
        setTypeDocument("");
        setDocument("");
        setTitre("");
        setDescription("");
    };
    useEffect(() => {
        Modal.setAppElement('body');
        let promotions = [
            { id: 1, value: "Premiere Annee", isChecked: false, semestre: { S1: false, S2: false } },
            { id: 2, value: "Deuxieme Annee", isChecked: false, semestre: { S3: false, S4: false } },
            { id: 3, value: "Troisieme Annee", isChecked: false, semestre: { S5: false } },
        ];
        setPromotions(
            promotions.map(d => {
                return {
                    select: false,
                    id: d.id,
                    value: d.value,
                    isChecked: d.select,
                    semestre: d.semestre,
                };
            })
        );
        
       
       
    }, []);


    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        if (name === "document") {
            const value = target.files[0];
            setDocument(value);

        } else {
            const value = target.value;
            name === "typeDocument"
                ? setTypeDocument(value)
                : name === "titre"
                    ? setTitre(value)
                    : setDescription(value);
        }
    };

    const ModifierDoc = (event) => {

        // On récupére la valeur id de la note 
        dispatch({
            type: "SET_NOTE_ID",
            note_id: id__note,
        },

           

        );

        // on utilise id pour modifer la note

        axios.put(`http://localhost:8081/document/edit/${note_id}`,
            {
              
            
                "typeDocument": typeDocument,
                "titre": titre,
                
              
                
                "description": description,
                
            },
        ).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        closeModal();
        window.location.reload()
    };

    
     async function setid(){
       await dispatch({
            type: "SET_NOTE_ID",
            note_id: id__note,
        },

           
            

        );

        // redirect vers la page Note Detail de la note 
       
         history.push('/NoteDetail/' + encoder.encode(id__note * 458015185151881))


       

       
 

    }
       
        


//   Gestion d'affichage du menu modificationet suppression
    const ShowMenu= ()=>{
        dispatch({
            type: "SET_NOTE_ID",
            note_id: id__note,
        })


        if (classe=="note__options__list_hiden"){
            setclasse("note__options__list")

        }else{
            setclasse("note__options__list_hiden")

        }


       
    }

    // Suppression de la note par id
    const deleteNote =() => {
        axios.delete(`http://localhost:8081/document/delete/${note_id}`
        ).then(res => {
            //console.log(res.data[0].titre);
            //Parse if it a json object
            console.log(res)

        });
   
         window.location.reload()

    }

  
    // Gerer l'affichage au cas d'une long description 

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }
   
    return (
        <div className="note" ref={wrraper_ref}>

            {
                nouveauDocument &&
                (<Modal isOpen={true} onRequestClose={closeModal}>
                    <div className="modal-add-doc ">
                        <div className="header-add-doc">
                            <AddIcon />{" "}<h2>Modifier Note</h2>
                        </div>
                        <hr />
                        <div className="content">
                            <form>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="promotion">Promotion</label>
                                    </div>
                                    <div className="col-75">
                                        <div className="row">
                                            {promotions.map((d, i) => (
                                                <div className="col-25" key={d.id}>
                                                    <input
                                                        onChange={event => {
                                                            let checked = event.target.checked;
                                                            setPromotions(
                                                                promotions.map(data => {
                                                                    if (d.id === data.id) {
                                                                        data.select = checked;
                                                                        data.isChecked = checked;
                                                                    }
                                                                    return data;
                                                                })
                                                            );
                                                        }}
                                                        type="checkbox"
                                                        checked={d.select}
                                                    ></input>
                                                    <label key={d.id} htmlFor={d.value}>{d.value}</label>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="semestre">Semestres</label>
                                    </div>
                                    <div className="col-75">
                                        <div className="row">
                                            {promotions.map((promo, i) =>
                                                Object.keys(promo.semestre).map((key) => promo.isChecked && (
                                                    <div className="col-10" key={key}>
                                                        <span className={promo.semestre[key] ? "semestre enabled" : "semestre disabled"}
                                                            onClick={
                                                                (e) => {
                                                                    e.preventDefault();
                                                                    promo.semestre[key] = !promo.semestre[key];
                                                                    forceUpdate();
                                                                }
                                                            }
                                                        >
                                                            <span className="key">{key}</span>
                                                        </span>
                                                    </div>
                                                )

                                                )

                                            )
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="titre">Titre</label>
                                    </div>
                                    <div className="col-75">
                                        <input type="text" id="titre" name="titre" value={titre} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="typeDocument">Type du document</label>
                                    </div>
                                    <div className="col-75">
                                        <select id="typeDocument" name="typeDocument" onChange={handleChange} required>



                                            <option value={typeDocument}>{typeDoc}</option>
                                          
                                            <option value="EMPLOI_DU_TEMPS">Emploi du temps</option>
                                            <option value="NOTES_SEMINAIRE">Note de seminaire</option>
                                            <option value="NOTES_EVENEMENT">Note d'evenement</option>
                                            <option value="NOTES_DE_SORTIE">Note de sortie</option>
                                            <option value="REPPORT_DU_COURS">Repport du cours</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="description">Description</label>
                                    </div>
                                    <div className="col-75">
                                        <textarea id="description" name="description" placeholder="Description" value={description} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="document">Document</label>
                                    </div>
                                    <div className="col-75">
                                        <input type="file" name="document" onChange={handleChange} required />
                                    </div>
                                    <hr />
                                </div>
                                <div className="row row-btn">
                                    <input type="button" className="annuler" onClick={closeModal} value="Annuler" />
                                    <input type="button" className="submit" onClick={ModifierDoc} value="Modifier" />

                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>)
            }
             <div className="note__title__time">
                <div className="note__title__time__left">
                    <h5>{titre__note}</h5>
                    <span>{lastUpdate__note}</span>
                </div>

                <div className="note__title__time__right">
                    <MoreVertIcon onClick={ShowMenu} className="MoreIcon" />
                    <div className="note__options" >
                       <ul className={`${classe}`}>
                         <li>
                                <span onClick={openModal}>Modifier</span>
                         
                         </li>
                            <li>
                                <span onClick={()=>setDeleteModal(true)}>Supprimer</span>

                            </li>
                       </ul>
                    </div>
                </div>

                <Modal isOpen={deleteModal} style={customStyles}>
                    <h5>Vous voulez Supprimer la note? </h5>
                    <hr />
                    <br /><br /><br />
                    <div className="row row-btn">
                       

                        <input type="button" className="annuler" onClick={() => { setDeleteModal(false) }} value="Annuler" />


                        <input type="button" className="submit" onClick={deleteNote} value="Spprimer" />

                    </div>


                </Modal>
                
               
             </div>
             <div className="note__text">
                <p>{truncate(description__note,70)} </p>
             </div>
  
              <div className="note_btn">
                <button className="btn btn-primary" onClick={setid}>Voir plus </button>
              </div>
              
            
        </div>
            
        
    )
}

export default  Note
