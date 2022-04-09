// react
import { Children, useState } from 'react';
import PropTypes from 'prop-types';

// react boostrap components
import Container from 'react-bootstrap/Container';

// State provider
import peerStore from '../components/peerConnection/peerStore';

const mapChildrenToElements = (children) => {
  return Children.map(children, (child) => {
    return (
      <div
        style={{
          width: '250px'
        }}>
        {child}
      </div>
    );
  });
};

const getStyles = (connected) => {
  return {
    width: connected ? 'fit-content' : '100vw',
    height: connected ? 'fit-content' : '100vh',
    display: 'block',
    position: 'absolute',
    left: '0px',
    color: 'white',
    zIndex: 1
  };
};

/**
 * The base page for all views
 * @returns {JSX}
 */
const PageBase = ({ children }) => {
  const [connected] = useState(peerStore.connection !== null);
  return (
    <div style={getStyles(connected)}>
      <Container fluid>{mapChildrenToElements(children)}</Container>
    </div>
  );
};

PageBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default PageBase;
