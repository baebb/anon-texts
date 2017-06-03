import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

// components
import NumberField from '../components/number_field';

// actions
import { navigateSend } from '../actions/index';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      error: false
    }
  }
  
  isValidNumber(e) {
    e.preventDefault();
    const { number } = this.state;
    if (number.length !== 10 || number.substring(0, 2) !== '04') {
      this.setState({ error: true })
    } else {
      this.props.dispatch(navigateSend(number));
    }
  }
  
  handleChange(e) {
    this.setState({ number: e.target.value, error: false });
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
                  handleChange={this.handleChange.bind(this)}
                  error={this.state.error}
                />
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