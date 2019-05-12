import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Db from "../../../../schema";
import Schedule from "../schedule/Schedule";
import "./AllStacks.scss";
import Stack from "./Stack/Stack";

type Stacks = Db.Stack[];

const AllStacks = () => {
  const [stacks, setStacks] = useState<Stacks>([]);

  const getStacks = async () => {
    try {
      console.log("Getting stacks...");
      const result = await axios.get<Stacks>(`/stacks`);
      console.log(`result: ${JSON.stringify(result)}`);
      setStacks(result.data && result.data["items"]);
    } catch (err) {
      console.error("Failed to get Stacks", err);
    }
  };

  useEffect(() => {
    getStacks();
  }, []);

  return (
    <div className="AllStacks centered">
      <Schedule />
      <div className="stacks">
        <Link to="/add-stack" className="new-stack">
          <div className="text">
            Add Stack
            <i className="fas fa-plus" />
          </div>
        </Link>
        {stacks.map((stack, idx) => (
          <Stack
            id={(idx + 1).toString()}
            name={stack.title}
            img={stack.image}
            meta={""}
            description={stack.description}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default AllStacks;
