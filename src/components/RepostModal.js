import React from "react";
import { BiRepost } from "react-icons/bi";
import repostThisPost from "../functions/repostThisPost";
import Modal from 'react-modal';
import styled from "styled-components";


export default function RepostModal(params) {

    const [modalOpen , setModalOpen] = React.useState(false);

    const customStyles = {
        content:{
            top:'50%',
            left:'50%',
            right:'auto',
            bottom:'auto',
            marginRight:'-50%',
            transform:'translate(-50% , -50%)',
            background:'#333333',
            borderRadius:'50px',
            padding:'50px'
        }
    };
    const style = { color: "white" , width: "25px", height: "25px"}

    async function repostPost(){
        const verification = await repostThisPost(params.postId);

        if(verification) alert('Post repostado com sucesso');

        if(!verification) alert('Não foi possível repostar o post, tente novamente mais tarde');
        setModalOpen(false);
    };

    return(
        <>
            <BiRepost style={style} onClick={()=> setModalOpen(true)}/>
            <Modal
            isOpen={modalOpen}
            onRequestClose={()=> setModalOpen(false)}
            style={customStyles}
            >
                <OpcoesModal>
                    <h1>Are you sure you want to re-post this post?</h1>
                    <ul>
                        <button className="cancelar" onClick={()=>setModalOpen(false)}>No, go back</button>
                        <button className="confirmar" onClick={repostPost}>Yes, repost it</button>
                    </ul>
                </OpcoesModal>
            </Modal>
        </>
    )
};

const OpcoesModal = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    font-family:'Lato';
    font-size:34px;
    font-weight:700;
    color: #fff;
    h1{
        max-width:350px;
    }
    ul{
        margin-top:25px;
        width:100%;
        display:flex;
        justify-content:space-around
    }
    button{
        border:none;
        border-radius:5px;
        width:134px;
        height:37px;
        font-size:18px;
    }
    .cancelar{
        background-color:#FFF;
        color:#1877f2;
    }
    .confirmar{
        background-color:#1877f2;
        color:#FFF;
    }
`;