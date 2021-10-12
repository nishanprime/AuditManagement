import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const FormContainer = ({ children, extraSmall, medium, small }) => {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={extraSmall} md={medium}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

FormContainer.defaultProps = {
  extraSmall: 12,
  medium: 9,
  small: 12,
};

export default FormContainer;
