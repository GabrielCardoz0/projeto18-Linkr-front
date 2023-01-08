import styled from "styled-components"
import FillCard from "../components/FillCard"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { titleFont } from "../constants/fonts"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/urls";
import { useParams } from "react-router-dom";



export default function TimelinePage() {

    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const { hashtag } = useParams();


    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/timeline`)
        .then((res) => {
           
            setCards(res.data.posts);
            setHashtags(res.data.hashtags);
            setLoading(false);
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.");
      
        })
    }, [hashtag]);

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <>
        <Navbar/>
        <TimelineContainer>
        <Title>timeline</Title>
        <FillCard/>
        {cards.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        })}
        <TrendingCards hashtags={hashtags}/>
        </TimelineContainer>
        
        </>
    )
}

const TimelineContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-left: 10%;
    padding-bottom: 30px;
`

const Title = styled.div`
    box-sizing: border-box;
    font-family: ${titleFont};
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
    margin-top: 150px;
    margin-bottom: 43px;
    width: 611px;
    @media (max-width: 800px) {
        width: 100%;
        padding-left: 17px;
        font-size: 33px;
        line-height: 49px;
        margin-bottom: 19px;
        margin-top: 91px;
    }
`