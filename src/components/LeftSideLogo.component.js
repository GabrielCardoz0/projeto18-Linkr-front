import logo from "../assets/images/linkr.png";
import LeftSideLogo from "../assets/styles/LeftSideLogo.style"

export default function LeftSideLogoComponent(params) {
    return(
        <LeftSideLogo>
                <div>
                    <img src={logo} alt=""/>
                    <span>
                        save, share and discover the best links on the web
                    </span>
                </div>
        </LeftSideLogo>
    )
};

