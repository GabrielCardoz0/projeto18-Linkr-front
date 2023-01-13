import axios from "axios";
import { API_URL } from "../constants/urls";

export default async function repostThisPost(id) {

    const token = localStorage.getItem('token').replace(/["]/g , '');

    let postReposted = false;

    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    await axios.post(`${API_URL}/repost/${id}` , config)
    .then(res=>{
        postReposted = true;
    })
    .catch(err =>{
        console.log(err.response.data);
        postReposted = false;
    });

    return postReposted;
};
