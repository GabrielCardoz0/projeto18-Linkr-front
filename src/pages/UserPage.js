import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../constants/urls";
import { titleFont } from "../constants/fonts"
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"

export default function UserPage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name,setName] = useState("");
    const { id } = useParams();


    useEffect(() => {
        setLoading(true);
        axios.get(`${baseURL}/user/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setLoading(false);
            setName(res.data.posts[0].username);
            setCards(res.data.posts);
            setHashtags(res.data.hashtags);
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.")
        
        })
    }, [id]);

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <>
   
        <Navbar/>
        <UserContainer>
        <Title>{name}</Title>
       
        
        {cards.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        }
        )}
          
                <TrendingCards hashtags={hashtags}/>
    
        
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
