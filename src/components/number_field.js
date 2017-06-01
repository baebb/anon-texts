import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

const NumberField = (props) => {
  return (
    <FormGroup>
      <FormControl
        type="number"
        value={props.number}
        placeholder="eg. 0416 032 684"
        onChange={props.handleChange}
      />
      <br/><br/>
      <Button
        // onClick={() => this.props.dispatch(viewNumber(this.state.number))}
      >
        Send a sms
      </Button>
    </FormGroup>
  )
};

export default NumberField;