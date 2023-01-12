import styled from "styled-components"
import FillCard from "../components/FillCard"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { titleFont } from "../constants/fonts"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { API_URL } from "../constants/urls"



export default function TimelinePage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [folowMessage, setFollowMessage] = useState("")
    const { hashtag } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/timeline`,{
            headers: { Authorization: `Bearer ${token}` },
        })

        .then((res) => {
            const { posts, hashtags, followStatus } = res.data;
            setCards(posts);
            setHashtags(hashtags);
            setLoading(false);

            if(followStatus==="no-post"){
                setFollowMessage("No posts found from your friends")
            } else if(followStatus ==="no-follow"){
                setFollowMessage(`You don't follow anyone yet. Search for new friends!`)
            }

            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.");
      
        })
    }, [hashtag, token]);

    if(loading){
        return(
            <Load>
                Loading...
            </Load>
            
        )
    }

    return(
        <>
        <Navbar/>
        <TimelineContainer>
        <Title>timeline</Title>
        <FillCard/>
        {cards?.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        })}
        {folowMessage?<Message><h5>{folowMessage}</h5></Message>:null}
        
        <TrendingCards hashtags={hashtags}/>
        </TimelineContainer>
        
        </>
    )
}

const TimelineContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-left: 20%;
    padding-bottom: 30px;

    @media (max-width: 800px) {
        margin-left: 0;
    }
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

const Load = styled.h1`
    font-family: ${titleFont};
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: white;
`

const Message = styled.div`
  width: 611px;
  justify-content: center;

  >h5{
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 30px;
    margin-top: 100px;
    color: #6D6D6D;
    text-align: center;
  }

  @media (max-width: 800px) {
        width: 100%;
        justify-content: center;

        >h5{
            font-size: 16px;  
        }
    }

`;