import styled from 'styled-components';

export const Div = styled.div`
  background-color: transparent;
  position: fixed;
  height: 100%;
  width: 100%;
  opacity: 60%;
  top: 0px;
  right: 0px;
  right: ${props => props.sidebar ? '0' : '-100%'};
  animation: showSidebar .900ms;

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 60%;
      width: 100%;
    }
  }
`

export const Container = styled.div`
  background-color: #171717;
  position: fixed;
  height: 47px;
  top: 72px;
  right: 0px;
  width: 150px;
  border-radius: 0px 0px 0px 20px;
  right: ${props => props.sidebar ? '0' : '-100%'};
  animation: showSidebar .300ms;

  > div{
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    font-family: 'Lato', sans-serif;
    font-size: 17px;
  }
  @keyframes showSidebar {
    from {
      opacity: 0;
      height: 0;
    }
    to {
      opacity: 1;
      height: 5%;
    }
  }
  @media (max-width: 800px) {
      height: 43px;
      > div{
        font-family: 'Lato', sans-serif;
        font-size: 15px;
      }
        
    }
`;
