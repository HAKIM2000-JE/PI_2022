import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import '../Style/Document.css';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import axios from 'axios';
import useForceUpdate from 'use-force-update';

var download = require("downloadjs")
const path = "http://localhost:8081/public/documents__tableau__affichage/";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DocumentD(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const forceUpdate = useForceUpdate();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  
  const handleDownload = () =>{
    download(path+props.nomDocument+".pdf");
  }
  
  const handleInfo = () => {
    axios.get('https://dept-info.herokuapp.com/document/info', {
      params: {
        titre: props.nomDocument
      }
    }).then(res => {
      setDocumentInfo(res.data[0]);
      forceUpdate();
      setShowInfo(!showInfo);
      forceUpdate();
      //setTimeout(console.log(res.data[0].titre),7000);
      
      // //Parse if it a json object
      // const noms = [];
      // res.data.forEach((doc) => noms.push(doc.titre));
      // console.log(noms);
      // setNomDocument(noms);
    });
  }


  return (
    <div className="row">
      <div className="col-30">
        {showInfo && (<div className="documentInfo" id="documentInfo">
          <div className="row">
            <div className="col-35">
              Publie le : 
            </div>
            <div className="col-60">
              {documentInfo.createdAt}
            </div>
          </div>
          <div className="row">
            <div className="col-35">
              Titre : 
            </div>
            <div className="col-60">
              {documentInfo.titre}
            </div>
          </div>
          <div className="row">
            <div className="col-35">
              Description :
            </div>
            <div className="col-60">
              {documentInfo.description}
            </div>
          </div>
          <div className="row">
            <div className="col-35">
              Promotion :
            </div>
            <div className="col-60">
              {documentInfo.promotion}
            </div>
          </div>
          <div className="row">
            <div className="col-35">
              Semestre :
            </div>
            <div className="col-60">
              {documentInfo.semestre}
            </div>
          </div>
        </div>)}
        
        
          
      </div>
      <div className="col-100" >
        <div className="row" >
          <div className="col-5" >
            <div className="barre" >
              <GetAppRoundedIcon
                className="icon" 
                onClick={handleDownload}
              />
              <InfoRoundedIcon href="documentInfo"
                className="icon"
                onClick={handleInfo}
              ><a href="#documentInfo"/></InfoRoundedIcon>
              
            </div>
          </div>
          <div className="col-95">
            <Document 
            className=""
            file={path+props.nomDocument+".pdf"}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          </div>
        </div>
        
      </div>
    </div>
    
  );
}

export default DocumentD;