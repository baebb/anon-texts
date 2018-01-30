import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-little-router';
import { Grid, Row, Col, Button, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';

// assets
import LoadingGif from '../assets/gif/loading.gif';

// components
import MessageField from '../components/message_field';

// actions
import { sendMessage, checkNumber, resetSendSms } from '../actions/index';

class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
    };
  }
  
  componentDidMount() {
    this.props.dispatch(resetSendSms());
    if (!this.props.numberTypeStore[this.props.number]) {
      this.props.dispatch(checkNumber(this.props.number));
    }
  }
  
  isValidMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    const { numberTypeStore, number } = this.props;
    const numberCountry = _.get(numberTypeStore[number], 'countryCode');
    
    if (message === '') {
      this.setState({ error: 'MESSAGE_SHORT' });
    } else if (message.length > 140) {
      this.setState({ error: 'MESSAGE_LONG' });
    } else {
      this.props.dispatch(sendMessage(number, numberCountry, message));
    }
  }
  
  renderMessages(messageItem, index) {
    const { sentMsg, timestamp } = messageItem;
    const isReply = _.get(messageItem, 'isReply', false);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const t = new Date(timestamp).toLocaleString('en-US', options).split(',');
    return (
      <ListGroupItem key={index} header={sentMsg}>
        <small>{t}</small>
      </ListGroupItem>
    );
  }
  
  handleChange(e) {
    this.setState({ message: e.target.value, error: false });
  }
  
  
  displayMessageBox() {
    const {
      smsSent,
      smsSending,
    } = this.props;
    
    if (smsSent) {
      return (
        <div>
          <Alert bsStyle="success" className="alert-mt-0">
            <strong>message sent</strong>
          </Alert>
          <Button onClick={() => this.props.dispatch(resetSendSms())}>
            send another
          </Button>
        </div>
      );
    }
    
    if (smsSending) {
      return (
        <Alert bsStyle="warning">
          <p>
            <img src={LoadingGif} height="20px"/>
          </p>
          <p>sending...</p>
        </Alert>
      );
    }
    
    return (
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
    );
  };
  
  displayMessageHistory() {
    const {
      number,
      sentMessagesStore,
      sentMessagesIsLoading,
    } = this.props;
    const messageStore = _.get(sentMessagesStore, number, '');
    
    if (sentMessagesIsLoading) {
      return (
        <p>
          <img src={LoadingGif} height="20px"/>
        </p>
      )
    }
    
    if (messageStore.length) {
      return (
        <ListGroup>
          {messageStore
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(this.renderMessages)}
        </ListGroup>
      )
    }
    
    return (
      <p>no messages have been sent yet</p>
    )
  }
  
  displaySendMessage() {
    const {
      numberCheckLoading,
      numberCheckError,
      numberTypeStore,
      number,
    } = this.props;
    
    const numType = _.get(numberTypeStore[number], 'type', '');
    const numberCountry = _.get(numberTypeStore[number], 'countryCode', '');
    const formattedNumber = {
      US: `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 10)}`,
      AU: `${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7, 10)}`,
    };
    
    if (numberCheckLoading) {
      return (
        <Alert bsStyle="warning">
          <p>
            <img src={LoadingGif} height="20px"/>
          </p>
          <p>checking number</p>
        </Alert>
      );
    }
    
    if (numberCheckError) {
      return (
        <Alert bsStyle="danger">
          <strong>something broke :( </strong>
        </Alert>
      );
    }
    
    if (numType === 'mobile' || numType === 'voip') {
      return (
        <div className="send-box">
          <h2>sending to</h2>
          <h2>{formattedNumber[numberCountry]}</h2>
          <br/>
          {this.displayMessageBox()}
          <br/><br/>
          <div className="sent-messages-box">
            <h2>message history</h2>
            {this.displayMessageHistory()}
          </div>
        </div>
      );
    }
    
    return (
      <Alert bsStyle="danger">
        <strong>The number you provided is not a valid US or AU mobile number</strong>
      </Alert>
    );
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <br/>
              {this.displaySendMessage()}
              <Link href="/">
                <Button>Home</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    );
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
    numberCheckError: state.rootReducer.numberType.numberCheckError,
  };
}

export default connect(mapStateToProps, null)(Send);