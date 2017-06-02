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
      number: ''
    }
  }
  
  handleChange(e) {
    this.setState({ ...this.state, number: e.target.value });
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>Send anonymous sms messages to anyone in Australia</h2>
              <br/><br/>
              <form onSubmit={() => this.props.dispatch(navigateSend(this.state.number))}>
                <NumberField
                  number={this.state.number}
                  handleChange={this.handleChange.bind(this)}
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