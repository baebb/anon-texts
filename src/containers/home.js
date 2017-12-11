import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash'

// components
import NumberField from '../components/number_field';

// actions
import { navigateSend } from '../actions/index';

const countryOptions = [
  { value: 'US', label: 'US' },
  { value: 'AU', label: 'AU' }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: 'US',
      number: '',
      error: ''
    }
  }
  
  isValidNumber(e) {
    e.preventDefault();
    const { number } = this.state;
    const formattedNum = number.replace(/ /g,'');
    if (formattedNum.length !== 10) {
      this.setState({ error: 'BAD_LENGTH', number: '' });
    }
    else {
      this.props.dispatch(navigateSend(formattedNum));
    }
  }
  
  handleChange(e, key) {
    let value = _.get(e.target, 'value', e.value);
    if (key == 'number') {
      const formattedNum = value.replace(/ /g,'');
      this.setState({ ...this.state, [key]: formattedNum })
    } else {
      this.setState({ ...this.state, [key]: value });
    }
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>send anonymous<br/>texts to friends<br/><span className="spaceIt">😜</span></h2>
              <br/>
              <form onSubmit={(e) => this.isValidNumber(e)}>
                <div className="number-wrapper">
                  <div className="country-select">
                    <Select
                      name="countryCode"
                      value={this.state.countryCode}
                      options={countryOptions}
                      onChange={(e) => this.handleChange(e, 'countryCode')}
                      clearable={false}
                      searchable={false}
                    />
                  </div>
                  <div className="number-field">
                    <NumberField
                      number={this.state.number}
                      countryCode={this.state.countryCode}
                      handleChange={(e) => this.handleChange(e, 'number')}
                      error={this.state.error}
                    />
                  </div>
                </div>
                <br/>
                <Button type="submit">
                  send text
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    smsSent: state.rootReducer.sms.smsSent
  }
}

export default connect(mapStateToProps, null)(Home);