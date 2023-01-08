import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../providers/auth";
import { useContext, useState } from "react";
import axios from "axios";
import { BsTrashFill, BsFillPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Card(card){

    const token = localStorage.getItem("token")
    const [liked, setLiked] = useState(!!card.liked); 
    const navigate = useNavigate();

    function like(id){
        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/like`, {
          headers:{
              authorization: `Bearer ${token}`
          }, 
          data: {
            "postId": id
          }
        });

        promise.then(() => setLiked(!liked));

        promise.catch((e) => alert("Erro ao curtir este link. Tente mais tarde."));
    }

    function dislike(id){
      const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/dislike`, {
        headers:{
            authorization: `Bearer ${token}`
        }, 
        data: {
          "postId": id
        }
      });

      promise.then(() => setLiked(!liked));

      promise.catch((e) => alert("Erro ao descurtir este link. Tente mais tarde."));
  }

    return (
        <CardContainer>
        <UserInfo color_icon={liked}>
          <img src={card.pictureUrl} alt="profile"></img>
          <ion-icon name={liked? "heart-sharp": "heart-outline"} onClick={() => liked? like(card.id): dislike(card.id)}></ion-icon>
        </UserInfo>

        <UrlInfo>

            
        {
            localStorage.getItem("userId") === card.userId?
            (
                <CardHeader>
                    <h2>{card.username}</h2>
                    <ul>
                    <BsTrashFill />
                    <BsFillPencilFill />
                    </ul>
                </CardHeader>
            ) :
            (
                <h2>{card.username}</h2>
            )
        }
          

          <ReactTagify
            colors={"#FFFFFF"}
            tagClicked={(tag) =>
              navigate(`/hashtag/:${tag.slice(1, tag.length - 1)}`)
            }
          />
            <h3>{card.caption}</h3>

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
    )
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
`;

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
    color: ${props => props.color_icon? "#c91313": "#FFFFFF"};
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
`;

const MetaData = styled.div`
  width: 100%;
  height: 155px;
  border-radius: 11px;
  border: 1px solid #4f4f4f;
  margin-top: 18px;
  display: flex;

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
    & a {
      img {
        width: 30%;
        height: 100%;
        border-radius: 11px;
      }
    }
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