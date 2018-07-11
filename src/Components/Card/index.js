import React from 'react';
import PropTypes from 'prop-types';
import MuiCard, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Image from '../../Images/Logo.png';

function Card(props) {
  const style = {
    width: props.width,
  };

  return (
    <MuiCard color="secondary" raised className="card" style={style}>
      <div>
        <div>
          {props.img ? (
            <CardMedia>
              <img
                src={Image}
                className="center-img"
                width="200px"
                alt="Crescent"
              />
            </CardMedia>
          ) : (
            <CardHeader title={props.title} />
          )}
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
  img: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Card;
