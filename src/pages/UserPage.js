import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../constants/urls";
import { titleFont } from "../constants/fonts"
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import { AuthContext } from "../providers/auth";

export default function UserPage() {
    const { token } = useContext(AuthContext);;
    console.log("token:",token)
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name,setName] = useState("");
    const [following, setFollowing] = useState('');
    const[disabled, setDisabled] = useState(false)
    const { id } = useParams();

    
    const followUser= ()=>{
        setDisabled(true)

        axios.post(`${API_URL}/user/${id}`,{},{headers: { authorization: `Bearer ${token}`}}
        )
        .then((res) => {
            console.log(res.data)
            setFollowing(true)
            setDisabled(false)
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("Não foi possivel deixar de seguir esse usuário. Tente novamente!")
            setDisabled(false)
        
        })
    }

    const unfollowUser= ()=>{
        setDisabled(true)
        console.log({
            headers: { Authorization: `Bearer ${token}` },
        })
        axios.delete(`${API_URL}/user/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data)
            setFollowing(false)
            setDisabled(false)
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("Não foi possivel deixar de seguir esse usuário. Tente novamente!")
            setDisabled(false)
        
        })
    }
    useEffect(() => {
        axios.get(`${API_URL}/user/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data)
            setName(res.data.posts[0].username);
            setCards(res.data.posts);
            setHashtags(res.data.hashtags);
            setLoading(false);
            setFollowing(res.data.userFollow)
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.")
        
        })
    }, [token,id]);


 
    return(
        <>
   
        <Navbar/>
        <UserContainer>
        <Title>{name}</Title>
       
        <Load>{loading && 'loading...'}</Load>
        {cards.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        }
        )}
          
        <TrendingCards hashtags={hashtags}/>
        {
        following? (<Button className="unfollowButton" disabled={disabled} onClick={unfollowUser}>Unfollow</Button>) :
                        (<Button className="followButton" disabled={disabled} onClick={followUser}>Follow</Button> ) 
        }
        </UserContainer>
      
        
        </>
    )
}

const UserContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-left: 12%;
    padding-bottom: 20px;
    margin-bottom: 20px;

    .unfollowButton{
        background-color:#FFFFFF;
        color:#1877F2;
    }
    .followButton{
        background-color:#1877F2;
        color:#FFFFFF;
    }

    
`

const Title = styled.div`
    font-family: ${titleFont};
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
    margin-top: 150px;
    margin-bottom: 43px;
    width: 611px;
`
const Load = styled.h1`
    font-family: ${titleFont};
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: white;
`
const Button = styled.button`
        border-width: 0;
        border-radius: 5px;
        height:31px ;
        width:112px;

        position: fixed;
        top:150px;
        left:80%;
        cursor: pointer;
`