import React from 'react';
import PropTypes from 'prop-types';
import MuiCard, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

function Card(props) {
  const style = {
    width: props.width,
  };

  return (
    <MuiCard color="secondary" raised className="card" style={style}>
      <div>
        <div>
          <CardHeader title={props.title} />
          <Divider />
        </div>
      </div>
      <CardContent>{props.children}</CardContent>
    </MuiCard>
  );
}

Card.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Card;
