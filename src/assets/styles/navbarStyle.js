import styled from 'styled-components';

export const Container = styled.div`
    height: 72px;
    width:100%;
    display: flex;
    background-color: #151515;
    position: fixed;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    top:0;
    left:0;
    > img {
        width: 108px;
        height: 34px;
    }

    @media (max-width: 800px) {
        > img{
            width:99px;
            height:30px;
        }
    }
`

export const Div = styled.div`
    display: flex;
    color: #FFFFFF;
    justify-content: center;
    cursor: pointer;
    gap: 10px;

    svg{
        width: 40px;
        height: 30px;
        margin-top:10px;

    }

    > img {
        width: 53px;
        height: 53px;
        border-radius: 26px;
    }

    a{
        text-decoration: none;
        color:#FFFFFF;
    }

    @media (max-width: 800px) {
        gap:8px;
        
        > img{
            width:44px;
            height:44px;
            border-radius: 26px;
        }

        > svg{
            width: 30px;
            height: 25px;
        }
    }
`