import styled from "styled-components"
import FillCard from "../components/FillCard"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import { titleFont } from "../constants/fonts"
import Navbar from "../components/Navbar"
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../providers/auth";
import { baseURL } from "../constants/urls"
import InfiniteScroll from 'react-infinite-scroller';
import { BsChevronDoubleLeft } from "react-icons/bs"
import { useInterval } from "use-interval";



export default function TimelinePage() {
    const { token } = useAuth();
    const [cards, setCards] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [followStatus, setFollowStatus] = useState("");
    const [followMessage, setFollowMessage] = useState("");
    const [ref, setRef] = useState(null);
    const [newMessage, setNewMessage] = useState(0);
    const [shareUsernames, setShareUsernames] = useState([])
    
    function refresh(){
        setCards([]);
        setHasMore(true);
        setPage(0);
        setNewMessage(0);
        
    }
    
    useInterval(() => {
        axios.get(`${baseURL}/timeline`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const { posts} = res.data;
            if(posts[0].id !== ref){
                posts.map((post,index) => {
                    if(post.id === ref){
                        setNewMessage(newMessage + index);
                        setRef(posts[0].id);
                    }
                   
                })
                }
            }
        )
        .catch((err) => {
            console.log(err);
            
        })
    }, 15000);

    /* function getReposts() {
        axios.get(`${baseURL}/reposts`,{
            headers: { Authorization: `Bearer ${token}` },
        })

        .then((res) => {
            const { repostsUsernames, reposts } = res.data;
            console.log("data", res.data)
        
            if (reposts.length !== 0) {
                setCards(reposts);
                setShareUsernames(repostsUsernames)
                return;
            }
            
            return;
        })
        .catch((err) => {
            console.log(err);
            alert("An error has occurred. Please try again later.");
      
        })
    } */

    function loadFunc() {
        axios.get(`${baseURL}/timeline?page=${page}`,{
            headers: { Authorization: `Bearer ${token}` },
        })

        .then((res) => {
            setLoading(true);
            const { posts, hashtags } = res.data;
            if(page ===0){
                setRef(posts[0].id);
            }
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
            }
            

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
    }


 

    return(
        <>
        <Navbar/>
        <TimelineContainer >
        <Title>timeline</Title>
        <FillCard/>
      {newMessage > 0 &&  
      <NewMessages onClick={refresh}>
            {`You have ${newMessage} new posts!`}
        </NewMessages>}
        <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
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