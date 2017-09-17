import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';
import { Grid, Row, Col, Button, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import { get } from 'lodash';

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
    const { numberCheckLoading, numberCheckError, numberTypeStore, number } = this.props;
    const numType = get(numberTypeStore[number], 'type', '');
    const numberCountry = get(numberTypeStore[number], 'countryCode', '');
    const formattedNumber = {
      US: `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 10)}`,
      AU: `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7, 10)}`,
    };
    
    
    
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <br/>
              {numberCheckLoading ?
                <Alert bsStyle="warning">
                  <p>
                    <img src={LoadingGif} height="20px"/>
                  </p>
                  <p>checking number</p>
                </Alert>
                :
                numberCheckError ?
                  <Alert bsStyle="danger">
                    <strong>something broke :( </strong>
                  </Alert>
                  :
                  (numType === 'mobile' || numType === 'voip') ?
                    <div className="send-box">
                      <h2>sending to</h2>
                      <h2>{formattedNumber[numberCountry]}</h2>
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
                    :
                    <Alert bsStyle="danger">
                      <strong>the number you provided is not a US mobile number</strong>
                    </Alert>
              }
              <br/><br/>
              {numberTypeStore[number] !== 'mobile' ?
                null
                :
                <div className="sent-messages-box">
                  <h2>message history</h2>
                  {this.props.sentMessagesIsLoading ?
                    <p>
                      <img src={LoadingGif} height="20px"/>
                    </p>
                    :
                    this.props.sentMessagesStore[number] ?
                      <ListGroup>
                        {this.props.sentMessagesStore[number]
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