import styled from "styled-components";
import { baseFont } from "../constants/fonts";

export default function UserCardSearch({user}) {
    
    return(
        <>
        <UserCard>
            <img src={user.pictureUrl} alt={'user card'}/>
            <p>{user.username}</p>
        </UserCard>
        </>     
    )
}

const UserCard = styled.div`
    box-sizing: border-box;
    width: 563px;
    height: 60px;
    background: #E7E7E7;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 17px;
    &:hover {
    border: 1.75px solid #26abff;
    cursor: pointer;
  } & p{
    font-family: ${baseFont};
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  } & img{
    width: 39px;
    height: 39px;
    border-radius: 304px;
    margin-right: 12px;
  }
`
