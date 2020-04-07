import React, { Component } from 'react'
import { UncontrolledTooltip, Row, Col, Form, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CustomContainer, RoomCard, TextBubble } from '../components';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/auth/action';

class HomePage extends Component {

  onLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <CustomContainer>
        <Row className="overflow-hidden shadow" style={{ borderRadius: '0.5rem' }}>
          <Col sm={5} className="px-0" style={{ width: '700px' }}>
            <div className="bg-white" style={{ height: '700px' }} >
              <div className="bg-gray px-4 py-2 bg-light d-flex">
                <p className="h5 mb-0 py-1">Recent</p>
                <div style={{
                  right: '0',
                  position: 'absolute',
                  marginRight: '20px',
                }}>
                  <FontAwesomeIcon icon={faSignOutAlt} id="exit" onClick={this.onLogout} />
                  <UncontrolledTooltip placement="top" target="exit">
                    Log Out
                  </UncontrolledTooltip >
                  <FontAwesomeIcon className="mx-3" icon={faPlus} id="createRoom" />
                  <UncontrolledTooltip placement="top" target="createRoom">
                    Create Room
                  </UncontrolledTooltip >
                  <FontAwesomeIcon icon={faSearch} id="findRoom" />
                  <UncontrolledTooltip placement="top" target="findRoom">
                    Find Room
                  </UncontrolledTooltip >
                </div>
              </div>
              <div style={{
                overflowY: 'scroll',
                height: '100%',
                backgroundColor: '#cecece'
              }}>
                <div className="list-group rounded-0">
                  <RoomCard
                    message="Message MessageMessageMessageMessageMessage Message Message Message Message Message MesMessageMessageMessage Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message Message"
                    name="Name"
                    date="14 Des"
                    active={true}
                  />
                  <RoomCard
                    message="Message"
                    name="Name"
                    date="14 Des"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col sm={7} className="px-0">
            <div className="px-4 py-5 chat-box bg-white" style={{ overflowY: 'scroll', height: '700px' }}>
              <TextBubble
                mine={true}
                message="Hallo"
                date="14 des"
              />
              <TextBubble
                message="Hallo 2"
                date="15 des"
                senderName="Anwar"
              />
            </div>
            <Form action="#" className="bg-light">
              <InputGroup>
                <Input type="text" placeholder="Type a message" aria-describedby="button-addon2" className="rounded-0 border-0 py-4 bg-light" />
                <InputGroupAddon addonType="append">
                  <Button id="button-addon2" type="submit" active> <FontAwesomeIcon icon={faPaperPlane} /></Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </CustomContainer>
    );
  }
}


const mapDispatchToProps = {
  logoutUser,
}

export default connect(null, mapDispatchToProps)(HomePage)
