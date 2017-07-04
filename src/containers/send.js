import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';

// assets
import LoadingGif from '../assets/gif/loading.gif';

// components
import MessageField from '../components/message_field';

// actions
import { sendMessage, getSentMessages } from '../actions/index';

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: ''
    }
  }
  
  componentWillMount() {
    this.props.dispatch(getSentMessages(this.props.number));
  }
  
  isValidMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    if (message.length < 10) {
      this.setState({ error: 'MESSAGE_SHORT' });
    } else if (message.length < 140) {
      this.setState({ error: 'MESSAGE_LONG' });
    } else {
      this.props.dispatch(sendMessage(this.props.number, message));
    }
  }
  
  handleChange(e) {
    this.setState({ message: e.target.value, error: false });
  }
  
  render() {
    const formattedNumber = this.props.number ? `${this.props.number.slice(0,4)} ${this.props.number.slice(4,7)} ${this.props.number.slice(7,10)}` : null;
    
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>Send sms to:</h2>
              <h2>{formattedNumber}</h2>
              <br/><br/>
              <div className="send-box">
                {this.props.smsSent ?
                  <Alert bsStyle="success">
                    <strong>Message sent</strong>
                  </Alert>
                  : this.props.smsSending ?
                    <Alert bsStyle="warning">
                      <p>
                        <img src={LoadingGif} height="20px" />
                      </p>
                      <p>Sending...</p>
                    </Alert>
                    :
                    <form onSubmit={(e) => this.isValidMessage(e)}>
                      <MessageField
                        messsage={this.state.message}
                        handleChange={this.handleChange.bind(this)}
                        error={this.state.error}
                      />
                      <Button type="submit">
                        Send
                      </Button>
                    </form>
                }
              </div>
              <br/><br/>
              <div className="sent-messages-box">
                <h4>Message feed:</h4>
                {this.props.sentMessagesIsLoading ?
                  <p>
                    <img src={LoadingGif} height="20px" />
                  </p>
                  :
                  this.props.sentMessagesStore[`61${this.props.number.slice(1)}`] ?
                    <p>messages found</p>
                    :
                    <p>No messages have been sent</p>
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
    smsSending: state.rootReducer.sms.smsSending,
    smsSent: state.rootReducer.sms.smsSent,
    sentMessagesIsLoading: state.rootReducer.sentMessages.sentMessagesIsLoading,
    sentMessagesStore: state.rootReducer.sentMessages.sentMessagesStore
  }
}


export default connect(mapStateToProps, null)(Send);