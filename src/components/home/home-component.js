import React from "react";

import AppBar from "../appBar/appBar";
import UserCard from "../cards/user-card";
import CompletedCard from "../cards/completed-card";
import IncompleteCard from "../cards/incomplete-card";

class HomeComponent extends React.Component {
  render = () => (
    <AppBar>
      <div>
        <UserCard />
      </div>
      <CompletedCard />
      <IncompleteCard />
    </AppBar>
  );
}

export default HomeComponent;
