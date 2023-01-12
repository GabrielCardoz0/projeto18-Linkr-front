import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import styled from "styled-components";


export default function Coments(params) {
    const {showComents , setShowComents} = params;


    return(
        <>
            <ComentsIcon>
                <BsFillChatDotsFill onClick={() => setShowComents(!showComents)} />
                <p>0 comments</p>
            </ComentsIcon>
        </>
    )
};

const ComentsIcon = styled.div`
    margin-top:10px;
    color: #fff;
    font-size:11px;
    display:flex;
    flex-direction:column;
    align-items:center;
    font-family:'lato', sans-serif;
    svg{
        cursor: pointer;
        margin: 0 10px;
        font-size: 20px;
        color: #fff;
    }
    p{
        margin-top:8px;
    }
`;