import axios from "axios";
import { API_URL } from "../constants/urls";

export default async function deleteThisPost(id) {

    const token = localStorage.getItem('token').replace(/["]/g , '');

    let postDeleted = false;

    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    await axios.delete(`${API_URL}/delete-post/${id}` , config)
    .then(res=>{
        postDeleted = true;
    })
    .catch(err =>{
        console.log(err.response.data);
        postDeleted = false;
    });

    return postDeleted;
};
