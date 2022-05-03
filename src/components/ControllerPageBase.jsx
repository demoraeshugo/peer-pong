import { Children, useState } from 'react';
import Container from 'react-bootstrap/Container';

const styles = {};

const mapChildrenToElements = (children) => {
  return Children.map(children, (child) => {
    return (
      <div
        style={{
          width: '100%'
        }}>
        {child}
      </div>
    );
  });
};

const divStyle = {
  width: '100vw',
  height: '100vh',
  display: 'block',
  // position: 'absolute',
  // left: '0px',
  backgroundColor: 'black',
  color: 'white',
  zIndex: 1
};

const containerStyle = {
  width: '55vw',
  height: 'fit-content',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: 'auto',
  paddingBottom: 'auto',
  textAlign: 'center'
};

const ControllerPageBase = ({ children }) => {
  return (
    <div style={divStyle}>
      <Container style={containerStyle} fluid>
        {mapChildrenToElements(children)}
      </Container>
    </div>
  );
};

export default ControllerPageBase;
