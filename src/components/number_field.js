import React from 'react';
import { FormGroup, FormControl, Alert } from 'react-bootstrap';

const formatNumber = (number) => {

}

const NumberField = (props) => {
  return (
    <FormGroup>
      <FormControl
        type="tel"
        value={props.number}
        placeholder="eg. 415 570 4058"
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
      {props.error === 'BAD_LENGTH' ?
        <Alert bsStyle="danger">
          <p><strong>bad number</strong></p>
          <p>only 10-digit mobile numbers are supported</p>
        </Alert>
        :
        null
        // Australian number test
        // props.error === 'BAD_NUMBER_CODE' ?
        //   <Alert bsStyle="danger">
        //     <p><strong>Bad number</strong></p>
        //     <p>Only Australian mobile numbers starting with '04' are supported</p>
        //   </Alert>
        //   : null
      }
    </FormGroup>
  )
};

export default NumberField;