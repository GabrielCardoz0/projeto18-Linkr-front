import Coments from "../assets/styles/ComentsStyle";
import { BsFillCursorFill } from "react-icons/bs";
import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/urls";
import createComment from "../functions/createComment";

export default function ComentsArea(params) {
  const { showComents, card } = params;

  const userId = Number(localStorage.getItem("userId"));

  const [commentsList, setCommentsList] = React.useState([]);
  const [writeComment, setWriteComment] = React.useState("");

  useEffect(() => {
    if (showComents) {
      axios
        .get(`${API_URL}/comments/${card.id}`)
        .then((res) => {
          setCommentsList(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [showComents]);


  if (showComents) {
    return (
      <>
        <Coments>
          <ul>
            {commentsList.map((comment) => {
              return (
                <li>
                  <img src={comment.pictureUrl} alt="userImage" />
                  <div className="comment">
                    <h1>
                      {comment.username}
                      <span>
                        {comment.userId === userId
                          ? "• post's author"
                          : "• following"}
                      </span>
                    </h1>
                    <p>{comment.comment}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="inputContainer">
            <img src={card.pictureUrl} alt="userImage" />
            <input
              type={"text"}
              placeholder="write a comment..."
              onChange={(e) => setWriteComment(e.target.value)}
              value={writeComment}
            />
            <BsFillCursorFill onClick={()=> {
              createComment(writeComment , card.id,commentsList,setCommentsList);
              setWriteComment('');
            }}/>
          </div>
        </Coments>
      </>
    );
  } else {
    return "";
  }
};