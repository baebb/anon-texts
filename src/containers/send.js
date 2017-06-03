import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, FormGroup, InputGroup, FormControl, Alert } from 'react-bootstrap';


// components
import MessageField from '../components/message_field';

// actions
import { sendMessage } from '../actions/index';

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }
  
  isValidMessage(e) {
    // onClick={() => this.props.dispatch(sendMessage(this.state.value))}
  }
  
  handleChange(e) {
    this.setState({ message: e.target.value });
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>Send a sms to:</h2>
              <br/><br/>
              <div>
                {this.props.smsSent ? null :
                  <form onSubmit={(e) => this.isValidMessage(e)}>
                    <MessageField
                      messsage={this.state.message}
                      handleChange={this.handleChange.bind(this)}
                    />
                  </form>
                }
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


export default connect(mapStateToProps, null)(Send);