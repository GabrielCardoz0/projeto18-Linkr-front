import styled from "styled-components";
import LeftSideLogoComponent from "../components/LeftSideLogo.component";
import SignUpFormComponent from "../components/SignUpForm.component";
export default function SignUpPage() {
    return(
        <SignUp>
            <LeftSideLogoComponent/>
            <SignUpFormComponent/>
        </SignUp>
    );
};

const SignUp = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

    @media (max-width: 800px) {
        flex-direction:column;
    }
`;
