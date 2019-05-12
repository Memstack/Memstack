import React from "react";
import Layout from "./layout";
import AllStacks from "./components/stacks/AllStacks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCard from "./components/addCard/AddCard";
import StackById from "./components/stackById/StackById";
import AddStack from "./components/stacks/AddStack/AddStack";
import { Routes } from "./routes";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={Routes.AllStacks} exact component={AllStacks} />
            <Route path={Routes.AddCard} component={AddCard} />
            <Route path={Routes.AddStack} component={AddStack} />
            <Route path={Routes.StackById} component={StackById} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
