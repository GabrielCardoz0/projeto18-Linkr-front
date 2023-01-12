import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../constants/urls";
import { titleFont } from "../constants/fonts"
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useAuth } from "../providers/auth";

export default function TrendingPage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const { hashtag } = useParams();


    useEffect(() => {
        setLoading(true);
        axios.get(`${baseURL}/hashtag/${hashtag}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
           
            setLoading(false);
            setCards(res.data.posts);
            setHashtags(res.data.hashtags);
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.");
           
        })
    }, [hashtag, token]);

    

    return(
        <>
   
        <Navbar/>
        <TrendingContainer>
        <Title># {hashtag}</Title>
       <Load>{loading && 'loading...'}</Load>
        
        {cards.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        }
        )}
          
                <TrendingCards hashtags={hashtags}/>
    
        
        </TrendingContainer>
      
        
        </>
    )
}

const TrendingContainer = styled.div`
    display: flex;
    width: 80%;
    flex-direction: column;
    margin-left: 30%;
    padding-bottom: 30px;
    
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