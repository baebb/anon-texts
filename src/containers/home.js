import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

// components
import NumberField from '../components/number_field';

// actions
import { navigateSend } from '../actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      error: ''
    }
  }
  
  isValidNumber(e) {
    e.preventDefault();
    const { number } = this.state;
    if (number.length !== 10) {
      this.setState({ error: 'BAD_LENGTH', number: '' });
    } else if (number.substring(0, 2) !== '04') {
      this.setState({ error: 'BAD_NUMBER_CODE', number: '' });
    } else {
      this.props.dispatch(navigateSend(number));
    }
  }
  
  handleChange(e) {
    this.setState({ number: e.target.value, error: '' });
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>Send anonymous sms messages to anyone in Australia</h2>
              <br/><br/>
              <form onSubmit={(e) => this.isValidNumber(e)}>
                <NumberField
                  number={this.state.number}
                  handleChange={(e) => this.handleChange(e)}
                  error={this.state.error}
                />
                <Button type="submit">
                  Send a sms
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