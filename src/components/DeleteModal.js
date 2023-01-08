import React from "react";
import { BsTrashFill } from "react-icons/bs";
import deleteThisPost from "../functions/deleteThisPost";
import Modal from 'react-modal';
import styled from "styled-components";


export default function DeleteModal(params) {

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

    async function deletePost(){
        const verification = await deleteThisPost(params.postId);

        if(verification){
            alert('Post deletado com sucesso');
            window.location.reload();
        }

        if(!verification){
            alert('Não foi possível deletar o post, tente novamente mais tarde');
        }
    
        setModalOpen(false);
    };

    return(
        <>
            <BsTrashFill onClick={()=> setModalOpen(true)}/>
            <Modal
            isOpen={modalOpen}
            onRequestClose={()=> setModalOpen(false)}
            style={customStyles}
            >
                <OpcoesModal>
                    <h1>Are you sure you want to delete this post?</h1>
                    <ul>
                        <button className="cancelar" onClick={()=>setModalOpen(false)}>No, go back</button>
                        <button className="confirmar" onClick={deletePost}>Yes, delete it</button>
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
        cursor:pointer;
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