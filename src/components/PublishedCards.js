import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/urls";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";



export default function PublishedCards(){

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/timeline`)
        .then((res) => {
            setCards(res.data);
            setLoading(false);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);
console.log(cards);
    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    return(
        <>
        {cards.map((card) => {
     return(    <CardContainer>
            <UserInfo>
                <img src={card.pictureUrl} alt="profile"></img>
                <ion-icon name="heart-outline"></ion-icon>
            </UserInfo>

            <UrlInfo>
<<<<<<< HEAD
                <h2>{card.userId}</h2>
                <ReactTagify colors={"#FFFFFF"} tagClicked={(tag)=> alert(tag)}>  
=======
                <h2>{card.username}</h2>
                <ReactTagify colors={"#FFFFFF"} tagClicked={(tag)=> navigate(`/hashtag/:${tag.slice(1,tag.length -1)}`)}>
>>>>>>> 86898212b714041808dad36876792f07184c19da
                <h3>{card.caption}</h3>
                </ReactTagify>
                <MetaData>
               <a href={card.url} target="_blank" rel="noreferrer" >
                <div>
                <h3>
                {card.title}
                </h3>
                <h5>
                {card.description}
                </h5>
                <h4>
                {card.url}
                </h4>
                </div>
                </a>
                <img src={card.image} alt="link"></img>
            
                </MetaData>
            </UrlInfo>

        </CardContainer>    )
        })}
        </>
    );
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
    
    
`

const UserInfo = styled.div`
    width: 12%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    
   

   & img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }

    & ion-icon{
        font-size: 26px;
        color: #FFFFFF;
        margin-top: 12px;
     

    }


`

const UrlInfo = styled.div` 
    width: 86%;

    & h2{
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        color: #FFFFFF;
        margin-bottom: 8px;
    }
    & h3{
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        color: #B7B7B7;
    }
`

const MetaData = styled.div`
    width: 100%;
    height: 155px;
    border-radius: 11px;
    border: 1px solid #4F4F4F;
    margin-top: 18px;
    display: flex;

    & div{
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 14px 0 14px 14px;

        & h3{
            font-family: Lato;
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            color: #CECECE;

        }
        & h4{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
        }
        & h5{
            font-family: Lato;
            font-size: 11px;
            font-weight: 400;
            line-height: 13px;
            color: #cecece;

        }
        & a{
            img{
            width: 30%;
            height: 100%;
            border-radius: 11px;
            }
        }
    }

`