import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function TrendingCards({hashtags}) {
    const navigate = useNavigate();
    return(
        <Container>
            <Teme>
           <h2>trending</h2>
           </Teme>
           
         {hashtags.map((hashtag, i) => {
                return(
                 <h3 key={i} onClick={(hashtag)=>{navigate(`/hashtag/${hashtags[i].name}`)}}># {hashtag.name}</h3>
                  
                )
         })}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #171717;
    border-radius: 16px;
    width: 301px;
    height: 406px;
    position: absolute;
    margin-top: 272px;
    margin-left: 54%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    h3{
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin-top: 12px;
        margin-left: 12px;
        cursor: pointer;

    }
    @media (max-width: 800px) {
        display: none;
    }

`;
const Teme = styled.div`
    align-items: center;
    height: 70px;
    border-bottom: #FFFFFF 1px solid;
    padding: 12px;

    h2{
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        color: #FFFFFF;
    }

`;