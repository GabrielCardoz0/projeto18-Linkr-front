import axios from "axios";
import { API_URL } from "../constants/urls";

export default function createComment(comment , postId , commentsList ,setCommentsList) {

    if(comment.length < 1) return alert('write a valid comment');

    const token = localStorage.getItem('token').replace( /["]/g, '');


    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        comment:comment,
      },
    };

    axios.post(`${API_URL}/comment/${postId}` , {} , config)
    .then(res =>{
        setCommentsList([...commentsList , comment]);
    })
    .catch(err =>{
        alert('Unable to complete the request, please try again later');
        console.log(err.response.data);
    });

  };