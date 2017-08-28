import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';
import { Grid, Row, Col, Button, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';

// assets
import LoadingGif from '../assets/gif/loading.gif';

// components
import MessageField from '../components/message_field';

// actions
import { sendMessage, getSentMessages, checkNumber, resetSendSms } from '../actions/index';

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: ''
    }
  }
  
  componentDidMount() {
    if (!this.props.sentMessagesStore[this.props.number]) {
      this.props.dispatch(getSentMessages(this.props.number));
    }
    if (!this.props.numberTypeStore[this.props.number]) {
      this.props.dispatch(checkNumber(this.props.number))
    }
  }
  
  isValidMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    if (message.length < 10) {
      this.setState({ error: 'MESSAGE_SHORT' });
    } else if (message.length > 140) {
      this.setState({ error: 'MESSAGE_LONG' });
    } else {
      this.props.dispatch(sendMessage(this.props.number, message));
    }
  }
  
  renderMessages(messageItem, index) {
    let { sentMsg, timestamp } = messageItem;
    let t = new Date(timestamp).toLocaleString('en-US').split(',');
    // let formatedDate = t.format('dd.mm.yyyy hh:MM:ss');
    return (
      <ListGroupItem key={index} header={sentMsg}>
        {t}
      </ListGroupItem>
    )
  }
  
  handleChange(e) {
    this.setState({ message: e.target.value, error: false });
  }
  
  render() {
    const formattedNumber = this.props.number ? `${this.props.number.slice(0, 3)} ${this.props.number.slice(3, 6)} ${this.props.number.slice(6, 10)}` : null;
    
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <br/>
              {this.props.numberCheckLoading ?
                <Alert bsStyle="warning">
                  <p>
                    <img src={LoadingGif} height="20px"/>
                  </p>
                  <p>checking number</p>
                </Alert>
                :
                this.props.numberCheckError ?
                  <Alert bsStyle="danger">
                    <strong>something broke :( </strong>
                  </Alert>
                  :
                  this.props.numberTypeStore[this.props.number] !== 'mobile' ?
                    <Alert bsStyle="danger">
                      <strong>the number you provided is not a US mobile number</strong>
                    </Alert>
                    :
                    <div className="send-box">
                      <h2>sending to</h2>
                      <h2>{formattedNumber}</h2>
                      <br/>
                      {this.props.smsSent ?
                        <div>
                          <Alert bsStyle="success">
                            <strong>message sent ✅</strong>
                          </Alert>
                          <Button onClick={() =>
                            this.props.dispatch(resetSendSms())
                          }>send another</Button>
                        </div>
                        : this.props.smsSending ?
                          <Alert bsStyle="warning">
                            <p>
                              <img src={LoadingGif} height="20px"/>
                            </p>
                            <p>sending...</p>
                          </Alert>
                          :
                          <form onSubmit={(e) => this.isValidMessage(e)}>
                            <MessageField
                              messsage={this.state.message}
                              handleChange={this.handleChange.bind(this)}
                              error={this.state.error}
                            />
                            <Button type="submit" bsSize="large">
                              send
                            </Button>
                          </form>
                      }
                    </div>
              }
              <br/><br/>
              {this.props.numberTypeStore[this.props.number] !== 'mobile' ?
                null
                :
                <div className="sent-messages-box">
                  <h2>message history</h2>
                  {this.props.sentMessagesIsLoading ?
                    <p>
                      <img src={LoadingGif} height="20px"/>
                    </p>
                    :
                    this.props.sentMessagesStore[this.props.number] ?
                      <ListGroup>
                        {this.props.sentMessagesStore[this.props.number]
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map(this.renderMessages)}
                      </ListGroup>
                      :
                      <p>no messages have been sent yet</p>
                  }
                </div>
              }
              <Link href="/">
                <Button>Home</Button>
              </Link>
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
    sentMessagesStore: state.rootReducer.sentMessages.sentMessagesStore,
    numberCheckLoading: state.rootReducer.numberType.numberCheckLoading,
    numberTypeStore: state.rootReducer.numberType.numberTypeStore,
    numberCheckError: state.rootReducer.numberType.numberCheckError
  }
}


export default connect(mapStateToProps, null)(Send);