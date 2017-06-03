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
      message: '',
      error: false
    }
  }
  
  isValidMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    if (message.length < 140 && message.length > 20) {
      console.log('yes');
    } else {
      this.setState({ error: true })
    }
    // onClick={() => this.props.dispatch(sendMessage(this.state.value))}
  }
  
  handleChange(e) {
    console.log(this.state.message);
    this.setState({ message: e.target.value, error: false });
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>Send sms to:</h2>
              <h2>{this.props.number}</h2>
              <br/><br/>
              <div>
                {this.props.smsSent ?
                  <Alert bsStyle="success">
                    <strong>Message sent</strong>
                  </Alert>
                  :
                  <form onSubmit={(e) => this.isValidMessage(e)}>
                    <MessageField
                      messsage={this.state.message}
                      handleChange={this.handleChange.bind(this)}
                      error={this.state.error}
                    />
                  </form>
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
    number: state.router.params.number,
    smsSent: state.rootReducer.sms.smsSent
  }
}


export default connect(mapStateToProps, null)(Send);