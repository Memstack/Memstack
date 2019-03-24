import React from "react";
import "./AddCard.scss";
import AddCardForm from "./AddCardForm/AddCardForm";



class AddCard extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className="add-card">
        <AddCardForm />
      </div>
    );
  }
}

export default AddCard;
