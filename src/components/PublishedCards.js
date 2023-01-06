import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/urls";
import Card from "./Card";

export default function PublishedCards(){

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/timeline`)
        .then((res) => {
            setCards(res.data);
            setLoading(false);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

    }, []);

        

    return(
        <>
        {loading?
            <h1>Loading...</h1> :
            (cards.map((card) => <Card key={card.id} card={card} />))
        }
        </>
    );
}