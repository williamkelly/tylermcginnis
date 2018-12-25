import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview (props) {
  return (
    <div className='column'>
      <div>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      {props.children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PlayerPreview;
