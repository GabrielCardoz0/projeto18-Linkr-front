import styled from "styled-components"
import { fillCardTitleColor, inputPost, placeholderColor, publishButtonColor } from "../constants/colors"
import { baseFont } from "../constants/fonts"
import { useState } from 'react'
import axios from "axios"
import swal from "sweetalert"

export default function FillCard() {
    const { token, userimage } = useAuth();
    const [form, setForm] = useState({
		url: '',
		caption: ''
	});
	const [load, setLoad] = useState(false);

    function fillForm(e) {
		if (!load) {
			const { name, value } = e.target;
			const formContent = { ...form, [name]: value };
			setForm(formContent);
			console.log(formContent)
		}
	}

    function sendPost() {
		const URLpost = process.env.REACT_APP_API_BASE_URL + '/timeline';
		console.log(form);
		const promise = axios.post(URLpost, form,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );

		setLoad(true);

		promise.then((res) => {
			setLoad(false);
            window.location.reload(false);
		});

		promise.catch((err) => {
			swal({
				title: "Houve um erro ao publicar seu link",
			});
			setLoad(false);
		});
	} 

    return(
        <>
        <CardContainer>
            <img src={userimage} alt="user"></img>
            <AlignBox>
                <h2>What are you going to share today?</h2>
                <InputUrl
                placeholder="http://..."
                name="url"
                value={form.url}
                onChange={fillForm}
                type="text"
                disabled={load && true}
                load={load}
                />
                <InputCaption
                placeholder="Awesome article about #javascript"
                name="caption"
                value={form.caption}
                onChange={fillForm}
                type="text"
                disabled={load && true}
                load={load}
                />
                <PublishButton onClick={sendPost}>
                {load ? (
						'Publishing...'
					) : (
						'Publish'
					)}
                </PublishButton>
            </AlignBox>
        </CardContainer>
        </>
    )
}

const CardContainer = styled.div`
    width: 611px;
    height: 209px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    padding: 16px 22px 18px 16px;
    justify-content: space-between;
    
    & img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
    }

    @media (max-width: 800px) {
        width: 100%;
        height: 164px;
        border-radius: 0px;
        justify-content: center;

        & img {
            width: 0px;
            height: 0px;
        }
    }
`
const AlignBox = styled.div`
    display: flex;
    width: 503px;
    flex-direction: column;
    align-items: flex-end;
    & h2 {
    font-family: ${baseFont};
    font-style: normal;
    width: 503px;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: ${fillCardTitleColor};

    @media (max-width: 800px) {
        width: 100%;
        text-align: center;
      & h2{
            width: 100%;
            font-size: 17px;
            line-height: 20px;
        }
    }    
    }
`
const InputUrl = styled.input`
    border: none;
    box-sizing: border-box;
    width: 503px;
    height: 30px;
    font-family: ${baseFont};
    background-color: ${inputPost};
    border-radius: 5px;
    padding: 5px;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 5px;
    margin-top: 13px;

    ::placeholder{
        color: ${placeholderColor};
    }

    @media (max-width: 800px) {
        width: 100%;
        font-size: 13px;
        line-height: 16px;
    } 
`
const InputCaption = styled.textarea`
    border: none;
    box-sizing: border-box;
    width: 502px;
    height: 66px;
    font-family: ${baseFont};
    background-color: ${inputPost};
    border-radius: 5px;
    padding: 5px;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 5px;

    ::placeholder{
        color: ${placeholderColor};
        height: 50px;
    }

    @media (max-width: 800px) {
        width: 100%;
        height: 47px;
        font-size: 13px;
        line-height: 16px;
    } 
`
const PublishButton = styled.button`
    width: 112px;
    height: 31px;
    text-align: center;
    color: white;
    font-family: ${baseFont};
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    background-color: ${publishButtonColor};
    border: none;
    border-radius: 5px;

    @media (max-width: 800px) {
        height: 22px;
    } 
`