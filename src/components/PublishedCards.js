import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import {useState, useRef, useEffect} from "react";
import { API_URL } from "../constants/urls";
import DeleteModal from "./DeleteModal";

import axios from "axios";
import { useAuth } from "../providers/auth";
import swal from "sweetalert";
import { Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import RepostModal from "./RepostModal";



export default function PublishedCards({ card }) {

  const navigate = useNavigate();
  const [editPost, setEditPost] = useState(false);
  const [edited, setEdited] = useState('');
  const [caption, setCaption] = useState(card.caption);
  const [disabled, setDisabled] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(card.numberOfLikes);
  const captionRef = useRef(null);
  
  const  token  = useAuth();
  const [message, setMessage] = useState('')
  
  const [liked, setLiked] = useState(card.liked); 

  const postEdit = ()=>{
    setEditPost(!editPost)
    setDisabled(false)
    if(edited){
      setCaption(edited);
      
    } else{
      setCaption(card.caption);
    }
  };

  const keyPress= (e) =>{
    if(e.code === "Enter"){
      setDisabled(true)
      axios.put(`${API_URL}/timeline`,{id:card.id, caption})
      .then((response)=>{
        
        setCaption(response.data);
        setEdited(response.data)
        setEditPost(!editPost);
      })
      .catch(()=>{
        alert("Não foi possível editar esse post");
        setCaption(card.caption);
        setEditPost(!editPost);
      })
    } else if(e.code==="Escape"){
      setEditPost(!editPost)
      if(edited){
        setCaption(edited);
        
      } else{
        setCaption(card.caption);
      }
      
    }
    
  }

  useEffect(() => {
    if (editPost) {
      captionRef.current.focus();
    }
  },[editPost]);
  


    function getLikes(){
 
        const URLlikes = `${API_URL}/likes/${card.id}`;
        const promise = axios.get(URLlikes,
            {
                headers: { Authorization: `Bearer ${token.token}` },
            }
            );
            
        promise.then((res) => {
          console.log(res.data)
          
          setMessage(res.data.messageLikes)
        });
    
        promise.catch((err) => {
          swal({
            title: "Houve um erro ao mostrar as curtidas",
          });
        })
    }

    function like(id){
      const promise = axios.post(`${API_URL}/like/${id}`, 
      {},
      {
        headers:{
            authorization: `Bearer ${token.token}`
        }
      });

      promise.then((res) => {
        setLiked(!liked);
        console.log(res.data);
        setNumberOfLikes(res.data.numberOfLikes);
      });

      promise.catch((e) => alert("Erro ao curtir este link. Tente mais tarde."));
    }

  function dislike(id){
    const promise = axios.delete(`${API_URL}/dislike/${id}`, {
      headers:{
          authorization: `Bearer ${token.token}`
      }
    });

    promise.then((res) => {
       setLiked(!liked);
       setNumberOfLikes(res.data.numberOfLikes);
    });

    promise.catch((e) => alert("Erro ao descurtir este link. Tente mais tarde."));
  }

  const style = { color: "white" , width: "25px", height: "25px"}

  if (Number(localStorage.getItem("userId")) === card.userId) {
    return (
      <CardContainer>
        <UserInfo color_icon={liked}>
          <img src={card.pictureUrl} alt="profile"></img>
          <ion-icon name={liked? "heart-sharp": "heart-outline"} onClick={() => liked? dislike(card.id): like(card.id)}></ion-icon>
          <Popup
            trigger={<LikeText onMouseEnter={getLikes} >{numberOfLikes} likes
            </LikeText>}
            position="bottom center"
          >
          {message}
          </Popup>
          <BiRepost style={style}/>
          <LikeText>X re-posts</LikeText>
        </UserInfo>

        <UrlInfo>
          <CardHeader>
            <h2>{card.username}</h2>
            <ul>
              <DeleteModal postId={card.id} />
              <BsFillPencilFill onClick={postEdit}/>
            </ul>
          </CardHeader>
          {editPost? <Input ref={captionRef} type={"text"} value={caption} onChange={(e) => setCaption(e.target.value)} onKeyDown={(e) => keyPress(e)} disabled={disabled}/>:
          <ReactTagify
            colors={"#FFFFFF"}
            tagClicked={(tag) =>
              navigate(`/hashtag/${tag.slice(1, tag.length )}`)
            }
          >
            <h3>{caption}</h3>
          </ReactTagify>}

          <MetaData>
            <a href={card.url} target="_blank" rel="noreferrer">
              <div>
                <h3>{card.title}</h3>
                <h5 >{card.description}</h5>
                <h4>{card.url}</h4>
              </div>
            </a>
            <img src={card.image} alt="link"></img>
          </MetaData>
        </UrlInfo>
      </CardContainer>
    );
  } else {
    return (
      <CardContainer>
        <UserInfo color_icon={liked}>
          <img src={card.pictureUrl} alt="profile"></img>
          <ion-icon name={liked? "heart-sharp": "heart-outline"} onClick={() => liked? dislike(card.id): like(card.id)}></ion-icon>
          <Popup
            trigger={<LikeText onMouseEnter={getLikes} > {numberOfLikes} likes
            </LikeText>}
            position="bottom center"
          >
          {message}
          </Popup>
          <RepostModal/>
          <LikeText>X re-posts</LikeText>
        </UserInfo>

        <UrlInfo>
          <h2>{card.username}</h2>
          <ReactTagify
            colors={"#FFFFFF"}
            tagClicked={(tag) =>
              navigate(`/hashtag/${tag.slice(1, tag.length )}`)
            }
          >
            <h3>{card.caption}</h3>
          </ReactTagify>

          <MetaData>
            <a href={card.url} target="_blank" rel="noreferrer">
              <div>
                <h3>{card.title}</h3>
                <h5>{card.description}</h5>
                <h4>{card.url}</h4>
              </div>
            </a>
            <img src={card.image} alt="link"></img>
          </MetaData>
        </UrlInfo>
      </CardContainer>
    );
  }

}

const CardContainer = styled.div`
  width: 611px;
  height: 276px;
  background-color: #171717;
  margin-top: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  padding: 16px 22px 18px 9px;
  justify-content: space-between;


  @media (max-width: 800px) {
        width: 100%;
        height: 232px;
        border-radius: 0px;
        justify-content: center;

        & img {
            width: 0px;
            height: 0px;
        }
    }

`;

const Input = styled.input`
      background: #FFFFFF;
      border-radius: 7px;
      width:84%;
      text-align: left;
      min-height: 30px;
      border-width:0px;
`

const UserInfo = styled.div`
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;

  & img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
  }

  & ion-icon {
    font-size: 26px;
    color:  ${props => props.color_icon? "#c91313": "#FFFFFF"};;
    margin-top: 12px;
  }
`;

const UrlInfo = styled.div`
  width: 86%;

  & h2 {
    font-family: Lato;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 8px;
  }
  & h3 {
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #b7b7b7;
  }
  @media (max-width: 800px) {
        height: 115px;
    }
`;

const MetaData = styled.div`
  width: 100%;
  height: 155px;
  border-radius: 11px;
  border: 1px solid #4f4f4f;
  margin-top: 18px;
  display: flex;
  overflow: hidden;
  & div {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 0 14px 14px;

    & h3 {
      font-family: Lato;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      color: #cecece;
    }
    & h4 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #cecece;
    }
    & h5 {
      font-family: Lato;
      font-size: 11px;
      font-weight: 400;
      line-height: 13px;
      color: #cecece;
    }
    & 
      img {
        width: 30%;
        height: 100%;
        border-radius: 11px;
        object-fit: cover;
       
    }

    .dissable {
      display:none;
    }
  }
  @media (max-width: 800px) {
        width: 100%;
        height: 115px;
    }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    cursor: pointer;
    margin: 0 10px;
    font-size: 20px;
    color: #fff;
  }
`;

const LikeText = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #FFFFFF;
    margin: 4px;
    `
