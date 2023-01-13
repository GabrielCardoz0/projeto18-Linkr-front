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
import InfiniteScroll from "react-infinite-scroller";
import { useInterval } from "use-interval";


export default function UserPage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name,setName] = useState("");
    const { id } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [ref, setRef] = useState(null);
    const [newMessage, setNewMessage] = useState(0);

    function refresh(){
        setCards([]);
        setHasMore(true);
        setPage(0);
        setNewMessage(0);
        
    }


    useInterval(() => {
        axios.get(`${baseURL}/user/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const { posts} = res.data;
            if(posts[0].id !== ref){
                posts.map((post,index) => {
                    if(post.id === ref){
                        setNewMessage(newMessage + index);
                        setRef(posts[0].id);
                        return;
                    }
                })
                }
            }
        )
        .catch((err) => {
            console.log(err);
            
        })
    }, 15000);

    function loadFunc() {
        axios.get(`${baseURL}/user/${id}?page=${page}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            setName(res.data.posts[0].username);
            setLoading(true);
            const { posts, hashtags } = res.data;
            if (posts.length !== 0) {
                setCards([...cards, ...posts]);
                setHashtags(hashtags);
                setPage(page+1);
                setLoading(false);
                return;
            }
            else{
                setHasMore(false);
                setLoading(false);
                setPage(0);
                return;
            }
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
        {newMessage > 0 &&  
      <NewMessages onClick={refresh}>
            {`You have ${newMessage} new posts!`}
        </NewMessages>}
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
const NewMessages = styled.div`
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 30px;
    width: 611px;
    height: 61px;
    background-color: #1877F2;
    margin-top: 30px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    `