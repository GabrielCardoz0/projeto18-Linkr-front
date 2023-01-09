import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

export default function PublishedCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/timeline`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setCards(res.data.posts);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  return (
    <>
        {loading?
            <h1>Loading...</h1> :
            (cards?.map((card) => <Card key={card.id} card={card} />))
        }
    </>
  );
}