import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./layout";
import AllStacks from "./components/stacks/AllStacks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCard from "./components/addCard/AddCard";
import StackById from "./components/stackById/StackById";
import AddStack from "./components/stacks/AddStack/AddStack";
import { Routes } from "./routes";
import { RouteChildrenProps } from "react-router";

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
            <Route path={Routes.Login} component={Login} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;

const Login: React.FC<RouteChildrenProps> = ({ location: { search } }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [message, setMessage] = useState("");

  const [uploadUrl, setUploadUrl] = useState("");

  const loginFlow = async (code: string) => {
    await axios.post("/login", { code });

    const res = await axios.post<{ url: string }>("/upload", {
      filename: "foobar.jpg"
    });

    setUploadUrl(res.data.url);
  };

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");

    console.log("Code", code);

    if (!code) {
      setMessage("No code provided");
    } else {
      setMessage(`Got code ${code}`);

      loginFlow(code);
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <p>{message}</p>
      <p>{uploadUrl}</p>
    </div>
  );
};
