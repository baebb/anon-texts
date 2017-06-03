import React from 'react';
import { Row, Col, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';


const MessageField = (props) => {
  return (
    <FormGroup>
      <FormControl
        type="text"
        value={props.message}
        placeholder="Your message"
        onChange={props.handleChange}
      />
      <br/><br/>
      {!props.error ? null :
        <Alert bsStyle="danger">
          Messages must be less than 20 and over 140 characters (including spaces)
        </Alert>
      }
      <Button type="submit">
        Send message
      </Button>
    </FormGroup>
  )
};

export default MessageField;