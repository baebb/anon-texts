import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, FormGroup, InputGroup, FormControl, Alert } from 'react-bootstrap';

import { sendMessage } from '../actions/index';

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
              <div>
                {this.props.smsSent ? null : <form>
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Addon>Msg:</InputGroup.Addon>
                      <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Your message"
                        onChange={this.handleChange.bind(this)}
                      />
                    </InputGroup>
                    <br/><br/>
                    <Button
                      onClick={() => this.props.dispatch(sendMessage(this.state.value))}
                    >
                      Send msg
                    </Button>
                  </FormGroup>
                </form>}
                {this.props.smsSent ?
                  <Alert bsStyle="success"><strong>Message sent</strong></Alert>
                  : null
                }
              </div>
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