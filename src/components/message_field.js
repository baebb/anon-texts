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
      <Button type="submit">
        Send msg
      </Button>
    </FormGroup>
  )
};

export default MessageField;