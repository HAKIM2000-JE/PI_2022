import React , {useEffect, useState} from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import { pdfjs } from 'react-pdf';
import { useStateValue } from "../StateProvider";
import { Link, useHistory , withRouter } from "react-router-dom";
import '../Style/notedetail.css'
import Commentaire from './Commentaire';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { Document, Page } from 'react-pdf';

const path = "http://localhost:8081/public/documents__tableau__affichage/";
var encoder = require('int-encoder')

encoder.alphabet('0123456789abcdef')


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

var download = require("downloadjs")








function NoteDetail(props) {
    const [{ note_id }] = useStateValue();
    const [numPages, setNumPages] = useState(null);
    const [document, setDocument] = useState([]);
    const [commentaires, setCommentaires] = useState([])
    const [text, settext] = useState("")
    const [pdf, setPdf] = useState("")
    const [pageNumber, setPageNumber] = useState(1);
    const history = useHistory();


  
     const back = ()=>{
         history.replace(`/notes`)
        
     }


    useEffect(() => {
        const loadDoc = ()=>{
            axios.get(`http://localhost:8081/document/notes/${props.match.params.id}`)
                .then(function (response) {
                    console.log(response);
                    // alert('Done')


                    const noms = [];
                    response.data.forEach((doc) => noms.push(doc));
                    console.log(noms);
                   
                    setDocument(noms);
                })
                .catch(function (error) {
                    console.log(error);
                });

            

            axios.get(`http://localhost:8081/commentaire`)
                .then(function (response) {
                    console.log(response);
                    // alert('Done')

                    
                    const noms = [];
                    response.data.forEach((doc) => {
                       
                        if (doc.idDocument == encoder.decode(props.match.params.id) / 458015185151881){
                            noms.push(doc)
                            console.log(doc.idDocument)
                        }
                        
                        
                    });
                    console.log(noms);

                    setCommentaires(noms);
                })
                .catch(function (error) {
                    console.log(error);
                });


                

        }
        loadDoc()
        
    },[] )



    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const ajouterCommentaire =()=>{
        axios.post('http://localhost:8081/commentaire/ajouter',{
            text : text,
            idDocument: encoder.decode(props.match.params.id) / 458015185151881,
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
        window.location.reload()
        // history.push('/NoteDetail/' + document[0].numeroDocument)
    }

    console.log(note_id)
    console.log(document)
    console.log(commentaires)
    return (
       
        <div className="notedetail">
           
            
         
            {
                document.map((doc)=>(
                    <div className="">
                        

                        <h6 onClick={back} className="notedetail__trace"> <span>Notes</span>   &gt; {doc.titre}</h6>
                        <div className="">

                            <h4 className="notedetail__title">{doc.titre}</h4>

                            <div className="notedetail__body">
                                <div className="notedetail__account">
                                    <AccountCircleIcon className="notedetail__account__avatar" style={{ fontSize: 50 }} />
                                    <div className="">
                                        <h6 className="notedetail__account__name" >Undifined</h6>

                                        {/*<span className="notedetail__account__post">Chef du Département</span>*/}



                                        <span className="notedetail__time">{doc.updatedAt}</span>

                                    </div>

                                    <div className="notedetail___download" onClick={() => {
                                        download(path + doc.titre + ".pdf");
                                        // download("http://i.imgur.com/G9bDaPH.jpg", options, function (err) {
                                        //     if (err) throw err
                                        //     console.log("meow")
                                        // })
                                    }}>

                                        <p>Télecharger </p>
                                        <GetAppRoundedIcon
                                            className="icon"
                                            
                                        />
                                    </div>

                                </div>

                                <div className="notedetail__message">
                                    
                                    <p className="text-justify">
                                            {doc.description} <br />
                                            </p>
                              
                                   

                                    <h5 className="notedetail__message__pieceJoint">Piéce Jointe</h5>

                                    <div className="col-60">
                                        <Document
                                            className="notedetail__pdf"
                                            file={path + doc.titre + ".pdf"}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                        >
                                            <Page pageNumber={pageNumber} />
                                        </Document>
                                         <br/>

                                         
                                        
                                    </div>

                                </div>

                                <div className="notedetail__commentaires">
                                     <h6>Commentaires</h6>
                                     {
                                        commentaires.map((doc)=>(
                                            <Commentaire text={doc.text} time={doc.updatedAt} numerocommentaire={doc.numerocommentaire}  />

                                          ))
                                     }
                                   
                                    <textarea type="text" value={text} onChange={e=>{settext(e.target.value)}} />
                                    <button className="btn btn-primary"  onClick={ajouterCommentaire}>Publier</button>
                                </div>
                             
                            </div>


                        </div>
                       
                    </div>
                   
                    
                ))
            }
          
              

            
        </div>
    )
}

export default withRouter(NoteDetail)
