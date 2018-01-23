import React from "react";
import PropTypes from "prop-types";
import MuiCard, { CardHeader } from "material-ui/Card";
import { LockOutline } from "material-ui-icons";
import Divider from "material-ui/Divider";

class Card extends React.Component {
  state = { expanded: false, expanded1: false };

  render() {
    const { children } = this.props;

    return (
      <MuiCard color="secondary" raised className="card">
        <div className="row center">
          {this.props.title.includes("Login") ? (
            <div className="row center">
              <LockOutline className="pushdown" />
              <CardHeader title="Lunar Testing Login" />
            </div>
          ) : (
            <CardHeader title={this.props.title} />
          )}
        </div>
        <Divider />
        {children}
      </MuiCard>
    );
  }
}

export default Card;
