import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import '../Style/NouveauDocument.css';
import AddIcon from '@material-ui/icons/Add';
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


const AddUser = (props) => {

    const [modalAdd, setModalAdd] = useState();

    const [formdata,setformdata]=useState({


        email:'',
        password:'',
        matricule:'',
        nom:'',
        prenom:'',
        specialite:'',
        grade:'',
        genie:'',
        
    }) 
        
    const change=(e)=>{
        
        setformdata({...formdata,[e.target.name]:e.target.value})
        
    }
    

    const [value1, setValue1] = React.useState("Enseignant");
    const [value2, setValue2] = React.useState("Groupe d'utilisateur");

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const [userStatus, setUserStatus]=React.useState(1) // 0: no show, 1: show teacher form , 2: show student form.
    const radioHandler1=(userStatus)=>{
        setUserStatus(userStatus);
    }

    const [addStatus, setAddStatus] = React.useState(2) // 0: no show, 1: show user registration form , 2: show file input.
    const radioHandler2 = (addStatus) => {
        setAddStatus(addStatus);
    };



    const addEnseignant = (event)=>{

        // Create an object of formData
        const formDataAxios = new FormData();
        // Update the formData object
        formDataAxios.append("nom",formdata.nom);
        formDataAxios.append('prenom', formdata.prenom);
        formDataAxios.append('email', formdata.email);
        formDataAxios.append("password", formdata.password);
        formDataAxios.append("specialite", formdata.specialite);
        formDataAxios.append("grade", formdata.grade);

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8081/enseignant/add", formDataAxios)

            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        };
    
    // const handleChange1 = (event) => {
    //     setValue1(event.target.value);
    // };
    // const handleChange2 = (event) => {
    //     setValue2(event.target.value);
    // };

    const addEtudiant = (event)=>{

        // Create an object of formData
        const formData = new FormData();
        // Update the formData object
        formData.append("matricule",formData.matricule);
        formData.append("nom",formData.nom);
        formData.append('prenom',formData.prenom);
        formData.append('email', formData.email);
        formData.append("password", formData.password);
        formData.append("genie",formData.genie);

        // Request made to the backend api
        // Send formData object
        axios.post("http://localhost:8081/etudiant/add", formData).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });;
    };


    return (
        <div>


            <Modal  isOpen={true} onRequestClose={props.closeModal}>
                <div className="modal-add-doc">
                    <div className="header-add-doc">
                        <AddIcon/>{" "}<h2>Ajouter un utilisateur</h2>
                    </div>
                    <hr/>
                    <div className="content">
                        <div >
                            <h2 id="simple-modal-title">Nouvel Utilisateur</h2>
                            <form id="simple-modal-description">
                                <div>
                                    <FormLabel component="legend">Type d'utilisateur</FormLabel>
                                    <RadioGroup aria-label="user_type" name="user_type" row value={value1}>
                                        <div style={{display: 'flex'}}>
                                            <FormControlLabel value="Enseignant" control={<Radio checked={userStatus === 1} onClick={(e) => radioHandler1(1)} />} label="Enseignant" />
                                            <FormControlLabel value="Etudiant" control={<Radio checked={userStatus === 2} onClick={(e) => radioHandler1(2)} />} label="Etudiant" />
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div>
                                    <FormLabel component="legend">Type d'ajout</FormLabel>
                                    <RadioGroup aria-label="add_type" name="add_type" row value={value2}  >
                                        <div style={{display: 'flex'}}>
                                            <FormControlLabel value="Un utilisateur" control={<Radio checked={addStatus === 1} onClick={(e) => radioHandler2(1)} />} label="Un utilisateur" />
                                            <FormControlLabel value="Groupe d'utilisateur" control={<Radio checked={addStatus === 2} onClick={(e) => radioHandler2(2)} />} label="Groupe d'utilisateur" />
                                        </div>
                                    </RadioGroup>
                                </div>
                                {addStatus === 2 &&
                                <div className="info__stage">
                                    <h3>Veuillez charger un fichier csv</h3>
                                    <label>Liste: <em> &#x2a; </em><input type="file" name="liste"/></label>
                                </div>
                                }
                                {addStatus === 1 && userStatus === 2 &&
                                <div className="info__stage">
                                    <label>Matricule: <em> &#x2a; </em><input type="text"  name="matricule" onChange={change}/></label>
                                    <label>Nom: <em> &#x2a; </em><input type="text" name="nom"  onChange={change}/></label>
                                    <label>Prénom: <em> &#x2a; </em><input type="text" name="prenom"  onChange={change}/></label>
                                    <label>Email: <em> &#x2a; </em><input type="email" name="email"  onChange={change}/></label>
                                    <label>Mot de passe: <em> &#x2a; </em><input type="password" name="password" value={formdata.password} onChange={change}/></label>
                                    <label>Genie: <em> &#x2a; </em>
                                        <select name="genie" onChange={change}>
                                            <option value="null">-</option>  
                                            <option value="Genie_Industriel">Génie Industriel</option>
                                            <option value="Genie_Mecanique">Génie Mécanique</option>
                                            <option value="Genie_Civil">Génie civil</option>
                                            <option value="Genie_Electrique">Génie Electrique</option>
                                            <option value="Genie_RT">Génie Réseaux et Télecommunications</option>
                                            <option value="Genie_Informatique">Génie Informatique</option>
                                            <option value="Genie_Mis">Génie MIS</option>
                                            <option value="Genie_Procedes_Industriels">Génie des Procédés industriels</option>
                                            <option value="Genie_Mineral">Génie Minéral</option>

                                        </select>
                                    </label>
                                </div>
                                }

                                {addStatus === 1 && userStatus === 1 &&

                                     <form>
                            <div class="form-group">
                                    <label for="exampleInputEmail1">Nom</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1"  name='nom'  onChange={change}  />
                                    <label for="exampleInputEmail1">Prenom</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" name='prenom'  onChange={change}  />
                                    <label for="exampleInputEmail1">Email address  <em> &#x2a; </em></label>
                                        <input type="email" class="form-control" id="exampleInputEmail1"   onChange={change} name='email'/>
                                <label for="exampleInputEmail1">Mot de Passe</label>
                                        <input type="password" class="form-control" id="exampleInputEmail1" name="password" onChange={change} value={formdata.password} />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                        <label>Specialité: <em> &#x2a; </em>     </label>
                                            <select name="specialite" onChange={change} required>
                                                <option value="null">-</option>
                                                <option value="Informatique">Informatique</option>
                                                <option value="Electrotechnique">Electrotechique</option>
                                                <option value="Mathematiques">Mathematiques</option>
                                            </select>
                                    


                                        <label>Grade: <em> &#x2a; </em>    </label>
                                           <select name="grade" onChange={change} required>
                                                <option value="null">-</option>
                                                <option value="Professeur">Professeur</option>
                                                <option value="Docteur">Docteur</option>
                                                <option value="Ingenieur">Ingénieur</option>
                                            </select>
                                      
                                 </div>
                                    
                                        
                             </form>

                                    
                                }
                                   

                               
                                   <hr />
                                <div className="row row-btn">

                                    <input type="button" className="annuler" onClick={props.closeModal} value="Annuler" />
                                    <input type="button" className="submit" value="Ajouter" onClick={userStatus === 1 ? addEnseignant : addEtudiant}/>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </Modal>

        </div>

    )

}

export default AddUser;
