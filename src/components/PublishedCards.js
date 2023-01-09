import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import DeleteModal from "./DeleteModal";
import { useAuth } from "../providers/auth";
import swal from "sweetalert";
import axios from "axios";
import { Popup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";

export default function PublishedCards({ card }) {
  const navigate = useNavigate();

  const { token } = useAuth();
  const [message, setMessage] = useState('')
    function getLikes(){
        const URLlikes = `${process.env.REACT_APP_API_BASE_URL}/likes/${card.id}`;
        const promise = axios.get(URLlikes,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
        promise.then((res) => {
          //console.log(res.data)
          setMessage(res.data.messageLikes)
        });
    
        promise.catch((err) => {
          swal({
            title: "Houve um erro ao mostrar as curtidas",
          });
        })
    }

  if (Number(localStorage.getItem("userId")) === card.userId) {
    return (
      <CardContainer>
        <UserInfo>
          <img src={card.pictureUrl} alt="profile"></img>
          <ion-icon name="heart-outline"></ion-icon>
          <Popup
            trigger={<LikeText onMouseEnter={getLikes} >{card.numberOfLikes} likes
            </LikeText>}
            position="bottom center"
          >
          {message}
          </Popup>
          
        </UserInfo>

        <UrlInfo>
          <CardHeader>
            <h2>{card.username}</h2>
            <ul>
              <DeleteModal postId={card.id} />
              <BsFillPencilFill />
            </ul>
          </CardHeader>

          <ReactTagify
            colors={"#FFFFFF"}
            tagClicked={(tag) =>
              navigate(`/hashtag/${tag.slice(1, tag.length)}`)
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
  } else {
    return (
      <CardContainer>
        <UserInfo>
          <img src={card.pictureUrl} alt="profile"></img>
          <ion-icon name="heart-outline"></ion-icon>
          <Popup
            trigger={<LikeText onMouseEnter={getLikes} >{card.numberOfLikes} likes
            </LikeText>}
            position="bottom center"
          >
          {message}
          </Popup>
        </UserInfo>

        <UrlInfo>
          <h2>{card.username}</h2>
          <ReactTagify
            colors={"#FFFFFF"}
            tagClicked={(tag) =>
              navigate(`/hashtag/${tag.slice(1, tag.length)}`)
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
    color: #ffffff;
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