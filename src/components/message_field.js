import React from 'react';
import { Row, Col, FormGroup, FormControl, Alert } from 'react-bootstrap';


const MessageField = (props) => {
  return (
  <Row>
    <Col xs={12} sm={10} smOffset={1}>
      <FormGroup>
        <FormControl
          componentClass="textarea"
          rows="4"
          placeholder="Your message"
          value={props.message}
          onChange={props.handleChange}
        />
        <br/>
        {props.error === 'MESSAGE_SHORT' ?
          <Alert bsStyle="danger">
            <p><strong>message too short</strong></p>
            <p>messages must be more than 0 characters in length</p>
          </Alert>
          : props.error === 'MESSAGE_LONG' ?
            <Alert bsStyle="danger">
              <p><strong>message too long</strong></p>
              <p>messages must be less than 140 characters in length (including spaces)</p>
            </Alert>
            : null
        }
      </FormGroup>
    </Col>
  </Row>
  )
};

export default MessageField;