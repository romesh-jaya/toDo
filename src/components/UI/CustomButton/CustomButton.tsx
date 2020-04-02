import React from 'react';
import './CustomButton.css';
import PropTypes from 'prop-types';
import { CustomButtonTypes } from './CustomButtonTypes';

interface IProps {
  buttonType?: any;
  children: React.ReactNode;
  onClick?: any;
  margined?: boolean;
  curved?: boolean;
  id?: string;
}

const CustomButton: React.FC<IProps> = (props) => {
  const { buttonType, children, onClick, margined, curved } = props;
  /* eslint-disable react/button-has-type */
  return (
    <button onClick={onClick} type={buttonType} className={`${curved ? 'curved' : ''} ${margined ? 'margined' : ''} ${buttonType} custom-button`}>
      {children}
    </button>
  );
  /* eslint-enable react/button-has-type */
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(Object.values(CustomButtonTypes)),
  onClick: PropTypes.func,
  margined: PropTypes.bool,
  curved: PropTypes.bool
};

CustomButton.defaultProps = {
  buttonType: CustomButtonTypes.PRIMARY,
  onClick: () => {},
  margined: false,
  curved: false
};

export default CustomButton;
