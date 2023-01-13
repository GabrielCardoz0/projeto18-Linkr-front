import Coments from "../assets/styles/ComentsStyle";
import { BsFillCursorFill } from "react-icons/bs";
import React, { useEffect } from "react";
import axios from "axios";

export default function ComentsArea(params) {
  const { showComents } = params;

  useEffect(()=>{
    if (showComents) {
      axios.get('http://localhost:5000/comments/12')
    .then(res => {
      setCommentsList(res.data);
      console.log('veio:' ,res.data);
    })
    .catch(err => {
        console.log('num veio:' ,err.response.data);
    });
    }
  } ,[])

  const [commentsList , setCommentsList] = React.useState([]);

  

  if (showComents) {
    return (
      <>
        <Coments>
          <ul>
            {commentsList.map(() => {
             return(
              <li>
              <img
                src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg"
                alt="userImage"
              />
              <div className="comment">
                <h1>
                  Usuário <span> • following</span>
                </h1>
                <p>essimo</p>
              </div>
            </li>
             )
            })}
          </ul>
          
          <div className="inputContainer">
            <img
              src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg"
              alt="userImage"
            />
            <input type={"text"} placeholder="write a comment..." />
            <BsFillCursorFill />
          </div>
        </Coments>
      </>
    );
  } else {
    return "";
  }
}
