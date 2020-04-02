import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

interface IProps {
  children: React.ReactNode;
}

const Card: React.FC<IProps> = ({ children }) => <div className="card">{children}</div>;

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
