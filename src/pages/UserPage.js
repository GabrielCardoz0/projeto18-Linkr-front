import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../constants/urls";
import { titleFont } from "../constants/fonts"
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useAuth } from "../providers/auth";

export default function UserPage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name,setName] = useState("");
    const { id } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    function loadFunc() {
        axios.get(`${baseURL}/user/${id}?page=${page}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setName(res.data.posts[0].username);
            setLoading(true);
            const { posts, hashtags } = res.data;
            if (posts.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }
            setCards(prevCards => {
                return [...new Set([...prevCards, ...posts])]
              });
            setHashtags(hashtags);
            setPage(page + 1);
            setLoading(false);
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.")
        
        })
    }




   

 
    return(
        <>
   
        <Navbar/>
        <UserContainer>
        <Title>{name}</Title>
    
        <InfiniteScroll
         pageStart={0}
         loadMore={loadFunc}
         dataLength={1}
         hasMore={hasMore}
         loader={<Load>{'loading...'}</Load>}
        >
        {cards.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        })}
        </InfiniteScroll>
          
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
const Load = styled.h1`
    font-family: ${titleFont};
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: white;
`