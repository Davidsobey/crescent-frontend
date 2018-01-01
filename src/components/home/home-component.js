import React from "react";

import AppBar from "../appBar/appBar";
import UserCard from "../cards/user-card";
import CompletedCard from "../cards/completed-card";
import UncompletedCard from "../cards/uncompleted-card";

class HomeComponent extends React.Component {
  render = () => (
    <AppBar>
      <div>
        <UserCard />
      </div>
      <CompletedCard />
      <UncompletedCard />
    </AppBar>
  );
}

export default HomeComponent;
