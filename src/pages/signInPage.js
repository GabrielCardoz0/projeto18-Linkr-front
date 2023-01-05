import LeftSideLogoComponent from "../components/LeftSideLogo.component";
import SignInForm from "../components/SignInForm.component";
import { SignUp } from "./signUpPage";

export default function SignInPage() {
    return(
        <SignUp>
            <LeftSideLogoComponent/>
            <SignInForm/>
        </SignUp>
    );
};
