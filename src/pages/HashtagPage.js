import styled from "styled-components"
import PublishedCards from "../components/PublishedCards"
import { titleFont } from "../constants/fonts"

export default function HashtagPage() {
    return(
    
     <>
        <TrendingContainer>
            <Title>#javascript</Title>
            <PublishedCards/>
        </TrendingContainer>
     </>      
        
    )
}

const TrendingContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`

const Title = styled.div`
    font-family: ${titleFont};
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: white;
    margin-top: 150px;
    margin-bottom: 43px;
    width: 611px;
`