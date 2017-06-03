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
        {!props.error ? null :
          <Alert bsStyle="danger">
            Messages must be more than 10 and less than 140 characters (incl. spaces)
          </Alert>
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