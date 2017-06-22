import React from 'react';
import { Row, Col, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';


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
        <br/><br/>
        {props.error === 'MESSAGE_SHORT' ?
          <Alert bsStyle="danger">
            Bad message. Messages must be more than 10 characters (incl. spaces)
          </Alert>
          : props.error === 'MESSAGE_LONG' ?
            <Alert bsStyle="danger">
              Bad message. Messages must be less than 140 characters (incl. spaces)
            </Alert>
            : null
        }
        <Button type="submit">
          Send
        </Button>
      </FormGroup>
    </Col>
  </Row>
  )
};

export default MessageField;