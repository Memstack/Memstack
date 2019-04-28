import React from "react";
import Layout from "./layout";
import AllStacks from "./components/stacks/AllStacks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCard from "./components/addCard/AddCard";
import StackById from "./components/stackById/StackById";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={AllStacks} />
            <Route path="/add-card" component={AddCard} />
            <Route path="/stacks/:id" component={StackById} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
