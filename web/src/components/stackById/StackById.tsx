import React, { useState, useEffect } from "react";
import { RouteChildrenProps } from "react-router";
import axios from "axios";
import "./StackById.scss";
import { Stack, Card } from "../../../../schema/lib";

type StackByIdProps = RouteChildrenProps<{ id: string }>;

interface GetStackResponse extends Stack {
  cards: Card[];
}

const StackById: React.FC<StackByIdProps> = ({ match }) => {
  const [stack, setStack] = useState<GetStackResponse | null>(null);

  const getStack = async () => {
    if (match) {
      try {
        const result = await axios.get<GetStackResponse>(
          `/api/stacks/${match.params.id}`
        );

        setStack(result.data);
      } catch (err) {
        console.error("Failed to get cards", err);
      }
    }
  };

  useEffect(() => {
    getStack();
  }, []);

  return (
    <div className="StackById centered">
      {stack ? (
        <>
          <h1>{stack.title}</h1>
          <h4>{stack.description}</h4>
          <ul>
            {stack.cards.length ? (
              stack.cards.map(c => (
                <li key={c.id}>
                  <b>{c.front}</b>: {c.back}
                </li>
              ))
            ) : (
              <p>No cards in this stack</p>
            )}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default StackById;
