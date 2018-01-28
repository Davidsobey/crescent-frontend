import React from "react";
import PropTypes from "prop-types";
import MuiCard, { CardHeader } from "material-ui/Card";
import { LockOutline } from "material-ui-icons";
import Divider from "material-ui/Divider";

class Card extends React.Component {
  state = { expanded: false, expanded1: false };

  render() {
    const { children } = this.props;

    const style = {
      width: this.props.width
    };

    return (
      <MuiCard color="secondary" raised className={`card`} style={style}>
        <div>
          {this.props.title.includes("Login") ? (
            <div className="row center">
              <LockOutline className="pushdown" />
              <CardHeader title="Lunar Testing Login" />
              <Divider />
            </div>
          ) : (
            <CardHeader title={this.props.title} />
          )}
        </div>
        {children}
      </MuiCard>
    );
  }
}

export default Card;
