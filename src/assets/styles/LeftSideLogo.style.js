import styled from "styled-components";

const LeftSideLogo = styled.div`
    background-color:#151515;
    width:60vw;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:15px;
    div{
        display:flex;
        flex-direction:column;
    }
    img{
        width:233px;
        margin-bottom:15px;
    }
    span{
        font-size:43px;
        font-family:'Oswald', sans-serif;
        font-weight:700;
        color: #fff;
        max-width:442px;
    }

    @media (max-width: 800px) {
        width:100%;
        height:27%;
        div{
            align-items:center;
        }
        img{
            width:167px;
        }
        span{
            font-size:23px;
            max-width:250px;
        }

    }
    
`;

export default LeftSideLogo;