import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'redux-little-router';


class About extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <div className="text-center">
              <h2>About</h2>
              <br/>
              <p>I made this to mess with a friend</p>
              <p>I hope you and your friends enjoy this as much as we did</p>
              <br/>
              <p>:^)</p>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect()(About);