import styled from "styled-components";

const Coments = styled.div`
  width:611px;
  height:300px;
  background-color:#1e1e1e;
  position:relative;
  padding:20px;
  box-sizing:border-box;
  border-radius:16px;
  min-height:85px;
  font-family:'lato', sans-serif;
  
  .inputContainer{
    position:absolute;
    bottom:20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    img{
        width:39px;
        height:39px;
        border-radius:50%;
    }
    input{
        width:480px;
        height:39px;
        padding:12px;
        box-sizing:border-box;
        background-color:#252525;
        border-radius:8px;
        border:none;
        margin-left:15px;
    }
    svg{
        font-size:24px;
        color:#f3f3f3;
        margin-left:10px;
    }
  }

  ul{
    height:210px;
    overflow-y:scroll;
    img{
        width:39px;
        height:39px;
        border-radius:50%;
    }
    li{
        display:flex;
        border-bottom:1px solid #353535;
        min-height:70px;
        padding:15px 0 15px 0;
        box-sizing:border-box;
        .comment{
            width:510px;
            margin-left:15px;
            font-size:14px;
            font-weight:400;
            h1{
                color: #f3f3f3;
                font-weight:700;
            }
            span{
                color: #565654;
                margin-left:4px;
            }
            p{
                color:#acacac;
                margin-top:5px;
            }
        }
    }
  }
`;

export default Coments;