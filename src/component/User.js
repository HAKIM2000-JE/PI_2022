import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import '../Style/NewUsers.css';
import useForceUpdate from "use-force-update";
import axios from "axios";
import NewUserModal from "./NewUserModal";
import Table from './ShowTable';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const NewUser = (props) => {



    const forceUpdate = useForceUpdate();


    const [addUser, setAddUser] = useState(false);
    const [data, setData] = useState([]);
    const [tableEnseignant, setTableEnseignant] = useState(false);
    const [tableEtudiant, setTableEtudiant] = useState(false);

    const openModalAdd = () => {
        setAddUser(true);
    };
    const closeModalAdd = () => {
        setAddUser(false);
    };

    const afficherEnseignant = () => {
        axios.get("http://localhost:8081/enseignant/")
        .then(res => {
            //console.log(res.data[0].titre);
            //Parse if it a json object
            const myData = [];
            res.data.forEach((enseignant) => myData.push(enseignant));
            console.log(myData);
            setData(myData);
        });
        setTableEnseignant(true);
        setTableEtudiant(false)
    };


  const afficherEtudiant = () => {
    axios.get("http://localhost:8081/etudiant/")
      .then(res => {
        //console.log(res.data[0].titre);
        //Parse if it a json object
        const myData = [];
        res.data.forEach((enseignant) => myData.push(enseignant));
        console.log(myData);
        setData(myData);
        console.log(data)
      });
    setTableEtudiant(true);
    setTableEnseignant(false)
  };


    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
        
      });


    const columnsEnseignant = React.useMemo(
        () => [
          {
            Header: 'Nom complet',
            columns: [
              {
                Header: 'Nom',
                accessor: 'nom',
              },
              {
                Header: 'Prenom',
                accessor: 'prenom',
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Email',
                accessor: 'email',
              },
              {
                Header: 'Specialite',
                accessor: 'specialite',
              },
              {
                Header: 'Grade',
                accessor: 'grade',
              },
            ],
          },
          {
            Header: 'Action',
            accessor: 'action',
          },
        ],
        []
      );

  const columnsEtudiant = React.useMemo(
    () => [
      {
        Header: 'Nom complet',
        columns: [
          {
            Header: 'Nom',
            accessor: 'nom',
          },
          {
            Header: 'Prenom',
            accessor: 'prenom',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Maricule',
            accessor: 'matricule',
          },
          {
            Header: 'Genie',
            accessor: 'genie',
          },
        ],
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );
    
      const dataTable = [
        {
            "nom": "rifai",
            "prenom": "nouh",
            "email": "test",
            "specialite": "test",
            "grade": "test",
          },
          {
            "nom": "rifaiii",
            "prenom": "nouh",
            "email": "test",
            "specialite": "test",
            "grade": "test",
          }
      ]
          
      
    

    return (
        <div>
            <button onClick={openModalAdd}>
                Ajouter un utilisateur
            </button>
            <button onClick={afficherEnseignant}>
                Afficher les enseignants
            </button>

        <button onClick={afficherEtudiant}>
          Afficher les etudiants
        </button>
            
            <div>
          {tableEnseignant ? (<Table columns={columnsEnseignant} data={data} />) :
            tableEtudiant ?(
              <Table columns={columnsEtudiant} data={data} />):(

                      <></>

          )}
         

    
     
        </div>

            <div>
                {addUser && (<NewUserModal closeModal={closeModalAdd}/>)}
            </div>

        </div>
    );
}

export default NewUser;
