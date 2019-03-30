import React from "react";
import Helmet from "react-helmet";
import BottomMenu from "./BottomMenu/BottomMenu";
import "./Layout.scss";
import SideMenu from "./SideMenu/SideMenu";
import TopMenu from "./TopMenu/TopMenu";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => (
  <>
    <Helmet
      title="Memstack"
      meta={[
        { name: "description", content: "A platform for learning anything." },
        {
          name: "keywords",
          content: "learning, languages, flashcards, education, memstack"
        }
      ]}
      script={[
        { src: "/font-awesome-v5.7.2.js" },
      ]}
    />
    <TopMenu />
    <div className="flex">
      <SideMenu />
      <div id="content">{children}</div>
    </div>
    <BottomMenu />
  </>
);

export default Layout;
