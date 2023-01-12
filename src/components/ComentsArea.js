import Coments from "../assets/styles/ComentsStyle";
import { BsFillCursorFill } from "react-icons/bs";
import React from "react";

export default function ComentsArea(params) {
    const {showComents} = params;


    const [commentsList , setCommentsList] = React.useState([]);


    if(showComents){
        return(
            <>
            <Coments>
                <ul>
                    <li>
                        <img src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg" alt="userImage"/>
                        <div className="comment">
                            <h1>Usuário <span> • following</span></h1>
                            <p>comentário comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj dfgkdfçh kdçghkdgçhk mentário comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj dfgkdfçh kdçghkdgçhk mentário comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj dfgkdfçh kdçghkdgçhk tário comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj dfgkdfçh kdçghkdgçhk mentário comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj dfgkdfçh kdçghkdgçhk mentário comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj dfgkdfçh kdçghkdgç</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg" alt="userImage"/>
                        <div className="comment">
                            <h1>Usuário <span> • following</span></h1>
                            <p>comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj sjddffg</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg" alt="userImage"/>
                        <div className="comment">
                            <h1>Usuário <span> • following</span></h1>
                            <p>comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj sjddffg</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg" alt="userImage"/>
                        <div className="comment">
                            <h1>Usuário <span> • following</span></h1>
                            <p>comentário afçklj açsfkj sdçfgkj sdgjk çalfdjgçlkj sflgkj sjddffg</p>
                        </div>
                    </li>
                    <li>
                        <img src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg" alt="userImage"/>
                        <div className="comment">
                            <h1>Usuário <span> • following</span></h1>
                            <p>essimo</p>
                        </div>
                    </li>
                </ul>
                <div className="inputContainer">
                    <img src="https://hypescience.com/wp-content/uploads/2012/11/filhote-super-fofo.jpg" alt="userImage"/>
                    <input type={'text'} placeholder="write a comment..."/>
                    <BsFillCursorFill/>
                </div>
            </Coments>
            </>
        );
    } else {
        return(
            ''
        );
    };

};
