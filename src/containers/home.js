import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  
  handleChange(e) {
    this.setState({ ...this.state, value: e.target.value });
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>Send anonymous sms messages to anyone in Australia</h2>
              <br/><br/>
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