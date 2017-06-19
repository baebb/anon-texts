import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

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
      error: false
    }
  }
  
  componentWillMount() {
    this.props.dispatch(getSentMessages(this.props.number));
  }
  
  isValidMessage(e) {
    e.preventDefault();
    const { message } = this.state;
    if (message.length < 140 && message.length > 10) {
      this.props.dispatch(sendMessage(this.props.number, message));
    } else {
      this.setState({ error: true });
    }
  }
  
  handleChange(e) {
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
    smsSending: state.rootReducer.sms.smsSending,
    smsSent: state.rootReducer.sms.smsSent
  }
}


export default connect(mapStateToProps, null)(Send);