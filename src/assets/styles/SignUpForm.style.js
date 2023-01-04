import styled from "styled-components";

const SignUpForm = styled.div`
    background-color:#333333;
    width:40vw;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        max-width:80%;
        input{
            width:430px;
            height:65px;
            max-width:100%;
            background-color:#FFF;
            border-radius:6px;
            padding:15px;
            box-sizing:border-box;
            margin-bottom:13px;
            font-size:27px;
            border:none;
            color:#9f9f9f;
        }
        .submitButton{
            background-color:#1877F2;
            color: #fff;;
        }
    }
    span{
        color: #fff;
        font-size:20px;
        font-weight:400;
        text-decoration:underline;
    }

    @media (max-width: 800px) {
        width:100%;
        height:74vh;
    }
`;

export default SignUpForm;