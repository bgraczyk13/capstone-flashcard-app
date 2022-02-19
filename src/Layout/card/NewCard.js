import React, { useState, useEffect } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";
export default function NewCard() {
  const history = useHistory();

  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "" });

  const { deckId } = useParams();

  useEffect(() => {
    const ac = new AbortController();

    async function getDeck() {
      const theDeck = await readDeck(deckId, ac.signal);
      setDeck(theDeck);
    }

    getDeck();
    return () => ac.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
      deckId,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, card);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div>
      <Breadcrumb isNewCard={true} deck={deck} />
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        card={card}
      />
    </div>
  );
}
