import React from 'react';
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import Phone from 'react-phone-number-input';

import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';

const NumberField = (props) => {
  return (
    <Row>
      <Col xs={12}>
        <FormGroup>
          <Phone
            placeholder="Start typing a phone number"
            countries={['AU']}
            value={props.number}
            onChange={props.handleChange}
            className=""
          />
          <br/><br/>
          <Button
            type="submit"
          >
            Send a sms
          </Button>
        </FormGroup>
      </Col>
    </Row>
  )
};

export default NumberField;