import React from 'react'

function Pagination({ NotePerPage, TotalNote, paginate}) {
    const NotesIndex=[];
    console.log(NotePerPage)
    console.log(TotalNote)

    for(let i=1 ; i<=Math.ceil(TotalNote/NotePerPage) ; i++){
        NotesIndex.push(i)
    }

    console.log(NotesIndex)
    return (
        <nav>
            <ul className="pagination">
        {
            NotesIndex.map(index=>(
              
                    <li key={index} className="page-item">
                         <button  onClick={()=>(paginate(index))} className="page-link" >{index}</button>
                    </li>
                


            ))
        }
                </ul>
        </nav>
    )
}

export default Pagination
