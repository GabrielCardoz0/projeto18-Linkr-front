import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/urls";
import { titleFont } from "../constants/fonts"
import { useParams } from "react-router-dom";

export default function TimelinePage() {

    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const { hashtag } = useParams();


    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/hashtag/${hashtag}`)
        .then((res) => {
           
            setLoading(false);
            setCards(res.data.posts);
            setHashtags(res.data.hashtags);
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.")
            return;
        })
    }, [hashtag]);

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <>
   
       
        <TrendingContainer>
        <Title># {hashtag}</Title>
       
        
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
    width: 100%;
    flex-direction: column;
    margin-left: 12%;
    
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
