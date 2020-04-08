import React, { Component } from 'react'
import { Row, Col, Form, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { CustomContainer, RoomCard } from '../components';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/auth/action';
import { Tooltip } from 'antd';
import RoomModule from '../modules/room';
import { createNewRoom, getMyRoom, setSelectedRoom, joinNewRoom } from '../redux/room/action';
import moment from 'moment';

const MODAL_TYPE = {
  NEW_ROOM: 'NEW_ROOM',
  JOIN_ROOM: 'JOIN_ROOM',
}

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      modalType: MODAL_TYPE.DISMISS,
      isModalOpen: false,
      name: '',
      roomPage: 1,
    }
  };

  componentDidMount() {
    this.props.getMyRoom({ page: this.state.roomPage })
  }

  toggleDismiss = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  toggleNewRoom = () => {
    this.setState({
      modalType: MODAL_TYPE.NEW_ROOM,
      isModalOpen: true,
      name: '',
    });
  }

  toggleJoinRoom = () => {
    this.setState({
      modalType: MODAL_TYPE.JOIN_ROOM,
      isModalOpen: true,
      name: '',
    });
  }

  onLogout = () => {
    this.props.logoutUser();
    this.props.history.push('/');
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { name, modalType } = this.state;
    if (modalType === MODAL_TYPE.NEW_ROOM) {
      this.props.createNewRoom({ name });
    } else {
      this.props.joinNewRoom({ name });
    }
    this.setState({ name: '' });
  }

  render() {
    const { name, isModalOpen, modalType } = this.state;
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
                  <Tooltip title="Log Out">
                    <FontAwesomeIcon icon={faSignOutAlt} id="exit" onClick={this.onLogout} />
                  </Tooltip>
                  <Tooltip title="Create Room">
                    <FontAwesomeIcon className="mx-3" icon={faPlus} onClick={this.toggleNewRoom} />
                  </Tooltip>
                  <Tooltip title="Join Room">
                    <FontAwesomeIcon icon={faSearch} onClick={this.toggleJoinRoom} />
                  </Tooltip>
                </div>
              </div>
              <div style={{
                overflowY: 'scroll',
                height: '100%',
                backgroundColor: '#cecece'
              }}>
                <div className="list-group rounded-0">
                  {this.props.rooms.length > 0 ? this.props.rooms.map((item) => {
                    return (
                      <RoomCard
                        onClick={() => this.props.setSelectedRoom(item)}
                        key={item._id}
                        message={(item.conversation[0] && item.conversation.slice(-1)[0].text) || 'Not Conversation Yet'}
                        name={item.name}
                        date={moment((item.conversation[0] && item.conversation[0].createdAt) || item.createdAt).startOf('hour').fromNow()}
                        active={item._id === this.props.selectedRoomId}
                      />
                    )
                  }) : (<RoomCard
                    onClick={() => {}}
                    key={1}
                    message={'You need to create or join Room'}
                    name={'Admin'}
                    date={moment(new Date()).startOf('hour').fromNow()}
                    active={true}
                  />)}
                </div>
              </div>
              <div className="bg-light px-4 py-5 d-flex" />
            </div>
          </Col>
          <Col sm={7} className="px-0">
            <RoomModule.Message selectedRoom={this.props.selectedRoom} />
          </Col>
        </Row>
        <Modal isOpen={isModalOpen} toggle={this.toggleDismiss}>
          <Form onSubmit={this.onSubmit}>
            <ModalHeader toggle={this.toggleDismiss} close={(
              <button className="close" onClick={this.toggleDismiss}>&times;</button>
            )}>{modalType === MODAL_TYPE.NEW_ROOM ? "Create Room" : "Join Room"}</ModalHeader>
            <ModalBody>
              <Input type="text" className="form-control" placeholder="Name" value={name} name="name" onChange={this.onChange} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" onClick={this.toggleDismiss}>Submit</Button>
              <Button color="secondary" onClick={this.toggleDismiss}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </CustomContainer>
    );
  }
}


const mapDispatchToProps = {
  logoutUser,
  createNewRoom,
  getMyRoom,
  setSelectedRoom,
  joinNewRoom,
}

const mapStateToProps = state => {
  const roomState = state.room;
  return {
    rooms: roomState.rooms || [],
    selectedRoomId: roomState.selectedRoomId,
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
