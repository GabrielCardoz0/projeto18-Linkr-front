import axios from "axios";
import { API_URL } from "../constants/urls";

export default async function repostThisPost(id) {

    const token = localStorage.getItem('token').replace(/["]/g , '');
    const userId = localStorage.getItem('userId').replace(/["]/g , '');
    
    let postReposted = false;
    console.log(userId)
    await axios.post(`${API_URL}/repost/${id}` , userId , {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(res=>{
        postReposted = true;
    })
    .catch(err =>{
        console.log(err.response.data);
        postReposted = false;
    });

    return postReposted;
};
