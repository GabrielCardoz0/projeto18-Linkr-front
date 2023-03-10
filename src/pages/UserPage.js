import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import TrendingCards from "../components/TrendingCards"
import {  useState, useContext, useEffect} from "react";
import axios from "axios";
import { API_URL, baseURL } from "../constants/urls";
import { titleFont } from "../constants/fonts"
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"

import { AuthContext } from "../providers/auth";

import InfiniteScroll from "react-infinite-scroller";
import { useInterval } from "use-interval";
import { Message } from "semantic-ui-react";


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

    useEffect(()=>{
        axios.get(`${API_URL}/follow/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
        }).then((res)=>{
            console.log("EUUU:",res.data)
            setFollowing(res.data.followStatus)
        }
        ).catch((err)=>{
            console.log(err)
        })

        
    },[id, token]);

    useInterval(() => {
        axios.get(`${API_URL}/user/${id}`,{
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
            alert("N??o foi possivel seguir esse usu??rio. Tente novamente!")
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
            alert("N??o foi possivel deixar de seguir esse usu??rio. Tente novamente!")
            setDisabled(false)
        
        })
    };
    function loadFunc() {
        axios.get(`${API_URL}/user/${id}?page=${page}`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data)
            setName(res.data.posts[0].username);
            setCards(res.data.posts);
            setHashtags(res.data.hashtags);
            setLoading(false);
            setFollowing(res.data.userFollow);
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
         loader={<Load>{'loading posts...'}</Load>}
        >
        {cards.map((card, i) => {
            return(
                <PublishedCards key={i} card={card}/>
            )
        })}
        </InfiniteScroll>
          
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

    @media(max-width: 1200px){
        margin-left: 5%;
    }
    @media(max-width: 1000px){
        margin-left: 2%;
    }
    @media (max-width: 800px) {
        margin-left: 0;
    }

    .unfollowButton{
        background-color:#FFFFFF;
        color:#1877F2;
    }
    .followButton{
        background-color:#1877F2;
        color:#FFFFFF;
    }
    @media (max-width: 800px) {
        margin-left: 0;
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
   font-family: Lato;
    font-size: 22px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.05em;
    color: #6D6D6D;

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
const Button = styled.button`
        border-width: 0;
        border-radius: 5px;
        height:31px ;
        width:112px;

        position: fixed;
        top:150px;
        right:8%;
        cursor: pointer;

        @media (max-width: 800px) {
        left: 0;
        right:20px;
    }
`