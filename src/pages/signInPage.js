import { useContext } from "react";
import LeftSideLogoComponent from "../components/LeftSideLogo.component";
import SignInForm from "../components/SignInForm.component";
import localTokenVerify from "../functions/localTokenVerify";
import { AuthContext } from "../providers/auth";
import { SignUp } from "./signUpPage";

export default function SignInPage() {

    const token = localTokenVerify();
    const { setToken } = useContext(AuthContext);
    setToken(token);

    return(
        <SignUp>
            <LeftSideLogoComponent/>
            <SignInForm/>
        </SignUp>
    );
};
