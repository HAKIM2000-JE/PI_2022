import React  , {useEffect  , useState , useRef} from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import '../Style/notes.css'
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';
import { useStateValue } from "../StateProvider";

import SearchIcon from '@material-ui/icons/Search';
import '../Style/NouveauDocument.css';
import Button from '@material-ui/core/Button';

import useForceUpdate from 'use-force-update';
import Pagination from './Pagination'


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function Notes() {

    const [nouveauDocument, setNouveauDocument] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [promotion, setPromotion] = useState("Promotions");
    const [typeDocument, setTypeDocument] = useState("Tout");
    const [document, setDocument] = useState(null);
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [currentpage, setCurrentpage] = useState(1)
    const [NotePerPage, setNotePerPage] = useState(5)


    const indexLastNote=currentpage*NotePerPage;
    
    const indexFistNote = indexLastNote-NotePerPage;
    console.log(indexLastNote)
    console.log(indexFistNote)

    const myRef = useRef(null)



    const paginate = (index)=>{
        setCurrentpage(index)
        scrollToRef(myRef)
    }
    
    const forceUpdate = useForceUpdate();

  

    




    const openModal = () => {
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

    const customStyles = {
        content: {
            'z-index': '2',
            top: '10%'

        }
    };

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

    // Ajout d'une nouvelle note

    const addDoc = () => {

          if(titre=='' ){
              alert('Veuillez Introduire le titre de la note ')
              
          }
          if(promotions.length==0){
              alert('Veuillez Spécifier  la promotion ')
          }

        // Create an object of formData
        const formData = new FormData();
        console.log(description);
        // Update the formData object
        formData.append("file", document);
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append("typeDocument", typeDocument);
        formData.append("promotions", JSON.stringify(promotions));
      

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8081/upload", formData);
        closeModal();
    };
    
    const [nomDocument, setNomDocument] = useState([]);

    // Affichage des notes

    useEffect(() => {


        const afficherDocument = (e) => {
            axios.get('http://localhost:8081/document/info'
            ).then(res => {
                //console.log(res.data[0].titre);
                //Parse if it a json object
                const noms = [];
                res.data.forEach((doc) => noms.push(doc));
                console.log(noms);
                setNomDocument(noms);
                
            });
        }
        afficherDocument()
       
    }, [])
   
    
    // console.log(nomDocument)
    const searchNote=()=>{
        console.log(promotion)
        console.log(typeDocument)
        
        if(promotion=="Promotions" && typeDocument=="Tout"){
            // On affiche tout 
            axios.get(`http://localhost:8081/document/info`
            ).then(res => {
                //console.log(res.data[0].titre);
                //Parse if it a json object
                const noms = [];
                res.data.forEach((doc) => noms.push(doc));
                console.log(noms);

                setNomDocument(noms);

            });

        }

        
        else{
            //On affiche selon les valeurs choisies
            axios.get(`http://localhost:8081/document/?promotion=${promotion}&typeDocument=${typeDocument}`
            ).then(res => {
                //console.log(res.data[0].titre);
                //Parse if it a json object
                const noms = [];
                res.data.forEach((doc) => noms.push(doc));
                console.log(noms);

                setNomDocument(noms);

            });
            
            

        }
       
    }

    

    return (

        
        <div className="notes" ref={myRef}>
            <h2 className="notes__title">Notes</h2>
             

            <div className="notes__head" >

                <select onChange={(e)=>{
                    const value=e.target.value
                    setPromotion(value)
                   
                }}>

                    <option value="Promotions">Promotions</option>
                    <option value="Premiere Annee">Premiere Annee</option>
                    <option value="Deuxieme Annee">Deuxieme Annee</option>
                    <option value="Troisieme Annee">Troisieme Annee</option>
                   
                </select>
               
                
                

                <select id="typeDocument" name="typeDocument" onChange={e => {
                    const value = e.target.value
                    setTypeDocument(value)}} required>

                    <option value="Tout">Tout</option>
                    <option value="EMPLOI_DU_TEMPS">Emploi du temps</option>
                    <option value="NOTES_SEMINAIRE">Note de seminaire</option>
                    <option value="NOTES_EVENEMENT">Note d'evenement</option>
                    <option value="NOTES_DE_SORTIE">Note de sortie</option>
                    <option value="REPPORT_DU_COURS">Repport du cours</option>
                    <option value="AUTRE">Autre</option>
                </select>
                
             


                <button className="notes__head__searchbtn" onClick={searchNote}>
                  <SearchIcon/>
                </button>



                <Button size="medium"
                    color="primary"
                
                    onClick={openModal}
                    className="notes__ajouter__btn"
                >
                 <AddIcon />
                    <span className="Nouveau__Document
                   ">
                    Nouveau Document
                   
                 </span>
                </Button>
            </div>
                
                

            {
                nouveauDocument &&
                (<Modal isOpen={true} onRequestClose={closeModal} style={customStyles}>
                    <div className="modal-add-doc ">
                        <div className="header-add-doc">
                            <AddIcon />{" "}<h2>Nouvelle Note</h2>
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
                                        <input type="text" id="titre" name="titre" placeholder="Titre" onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-25">
                                        <label htmlFor="typeDocument">Type du document</label>
                                    </div>
                                    <div className="col-75">
                                        <select id="typeDocument" name="typeDocument" onChange={handleChange} required>
                                            <option value="AUTRE">Autre</option>
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
                                        <textarea id="description" name="description" placeholder="Description" onChange={handleChange} required  />
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
                                    <input type="button" className="submit" onClick={addDoc} value="Ajouter" />
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>)
            }

     
       
            
            {nomDocument?.length === 0 ? (
                <div>
                    <h5 className="note_NonTrouvée">Aucune Note trouvée</h5>
                </div>
            ) : (
                <div>
                  
                  
                    {nomDocument.slice(indexFistNote,indexLastNote).map(note => (


                        <Note
                            id__note={note.numeroDocument}
                            titre__note={note.titre}
                            description__note={note.description}
                            type__note={note.typeDocument}
                            lastUpdate__note={note.updatedAt} />
                    ))}


                        <div className="pagination_tab">
                            <Pagination NotePerPage={NotePerPage} TotalNote={nomDocument.length} paginate={paginate} />

                        </div>

                </div>
            )
            }
            

            
       
                    

        </div>
    )
}

export default Notes
