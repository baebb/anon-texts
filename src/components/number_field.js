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
      {props.error === 'BAD_LENGTH' &&
        <Alert bsStyle="danger" className="alert-mb-0">
          <p><strong>bad number</strong></p>
          <p>only 10-digit mobile numbers are supported</p>
        </Alert>
      }
    </FormGroup>
  )
};

export default NumberField;