// react
import React from 'react';
import PropTypes from 'prop-types';

// react boostrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// custom components
import Header from './Header';

const mapChildrenToRows = (children) => {
  return React.Children.map(children, (child) => {
    return (
      <Row>
        <Col>{child}</Col>
      </Row>
    );
  });
};

/**
 * The base page for all views
 * @returns {JSX}
 */
const PageBase = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      {mapChildrenToRows(children)}
    </Container>
  );
};

PageBase.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default PageBase;
