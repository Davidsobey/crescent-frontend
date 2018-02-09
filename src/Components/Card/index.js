import React from 'react';
import PropTypes from 'prop-types';
import MuiCard, { CardHeader } from 'material-ui/Card';
import { LockOutline } from 'material-ui-icons';
import Divider from 'material-ui/Divider';

function Card(props) {
  const style = {
    width: props.width,
  };

  return (
    <MuiCard color="secondary" raised className="card" style={style}>
      <div>
        {props.title.includes('Login') ? (
          <div className="row center">
            <LockOutline className="pushdown" />
            <CardHeader title="Lunar Testing Login" />
            <Divider />
          </div>
        ) : (
          <div>
            <CardHeader title={props.title} />
            <Divider />
          </div>
        )}
      </div>
      {props.children}
    </MuiCard>
  );
}

Card.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Card;
