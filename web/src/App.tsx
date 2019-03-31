import React from "react";
import Layout from "./layout";
import AllDecks from "./components/decks/AllDecks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCard from "./components/addCard/AddCard";
import DeckById from "./components/deckById/DeckById";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={AllDecks} />
            <Route path="/add-card" component={AddCard} />
            <Route path="/decks/:id" component={DeckById} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
