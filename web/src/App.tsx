import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddCard from "./components/addCard/AddCard";
import DeckCards from "./components/deckCards/DeckCards";
import AllDecks from "./components/decks/AllDecks";
import Layout from "./layout";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={AllDecks} />
            <Route path="/add-card" component={AddCard} />
            <Route path="/decks/1" component={DeckCards} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
