import React from 'react';
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
// import Phone from 'react-phone-number-input';

// import rrui from 'react-phone-number-input/rrui.css';
// import rpni from 'react-phone-number-input/style.css';

const NumberField = (props) => {
  return (
    <Row>
      <Col xs={12}>
        <FormGroup>
          <FormControl
            type="number"
            value={props.number}
            placeholder="eg. 0416 032 684"
            onChange={props.handleChange}
          />
          {/*<Phone*/}
            {/*placeholder="eg. 0416 032 684"*/}
            {/*country={'AU'}*/}
            {/*countries={['AU']}*/}
            {/*value={props.number}*/}
            {/*showCountrySelect={true}*/}
            {/*onChange={props.handleChange}*/}
            {/*className=""*/}
          {/*/>*/}
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