import React from 'react';
import { FormGroup, FormControl, Alert } from 'react-bootstrap';

const formatNumber = (number, countryCode) => {
  if (countryCode == 'US') {
    if (number.length >= 7) {
      return number.substr(0, 3) + ' ' + number.substr(3, 3) + ' ' + number.substr(6);
    }
    if (number.length >= 4) {
      return number.substr(0, 3) + ' ' + number.substr(3);
    }
    return number;
  }
  if (countryCode == 'AU') {
    if (number.length >= 8) {
      return number.substr(0, 4) + ' ' + number.substr(4, 3) + ' ' + number.substr(7);
    }
    if (number.length >= 5) {
      return number.substr(0, 4) + ' ' + number.substr(4);
    }
    return number;
  }
};

const localPlaceholder = {
  US: 'eg. 415 570 4058',
  AU: 'eg. 0449 995 782'
};

const NumberField = (props) => {
  return (
    <FormGroup>
      <FormControl
        type="tel"
        value={formatNumber(props.number, props.countryCode)}
        placeholder={localPlaceholder[props.countryCode]}
        onChange={props.handleChange}
        maxLength="12"
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