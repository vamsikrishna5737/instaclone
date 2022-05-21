import React, { useState, useEffect } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

const LandingPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fun() {
      let data1 = await fetch(process.env.REACT_APP_API + "/post");
      let data = await data1.json();
      setUsers([...data.user]);
    }

    fun();
  }, []);

  return (
    <div className="site-container">
      <Navbar />
      <div className="container">
        {users.length
          ? users.map((obj, idx) => {
              return <Card key={"vamsi" + idx} obj={obj} />;
            })
          : ""}
      </div>
    </div>
  );
};

export default LandingPage;
