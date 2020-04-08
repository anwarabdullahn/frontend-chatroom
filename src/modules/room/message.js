import React, { Component, Fragment } from 'react'
import { TextBubble } from '../../components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getRoomMessage, sendMessageRequest, sendMessageSuccess } from '../../redux/room/action';
import moment from 'moment';
import { Form, Button, InputGroup, InputGroupAddon, Input, Spinner } from 'reactstrap';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
import { BASE_URL } from '../../utils/api';
import { isEmpty } from 'lodash';
import openNotification, { TYPE as NOTIF_TYPE } from '../../utils/notification';

let socket;

class Message extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    }
  }

  componentDidMount() {
    socket = io(BASE_URL);
  }

  componentDidUpdate(prevState) {
    if ((prevState.room._id !== this.props.room._id && this.props.selectedRoomId !== '')
      || (prevState.selectedRoomId !== this.props.selectedRoomId)) {
      this.props.getRoomMessage(this.props.room);
    }

    socket.on('new_message', (data) => {
      const message = data.data;
      const result = this.props.messages.find(item => item._id === message._id)
      if (isEmpty(result)) {
        this.props.sendMessageSuccess(data);
        this.clearText();
        if (message.sender._id !== this.props.user._id) {
          openNotification(NOTIF_TYPE.INFO, `New Message from ${message.sender.name}`, message.text);
        }
      }
    });

    this.scrollToBottom();
  }

  componentWillUnmount() {
    socket.emit('disconnect');
    socket.off();
  }

  clearText = () => {
    this.setState({
      text: '',
    })
  }

  scrollToBottom = () => {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSendMessage = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { room, user } = this.props;
    socket.emit('new_message', { text, user, roomId: room._id });
    this.clearText()
    this.props.sendMessageRequest();
  }

  render() {
    const { room, user, isSendMessageLoading } = this.props;
    const { text } = this.state;
    return (
      <Fragment>
        <div className="bg-gray px-4 py-2 text-white bg-primary d-flex">
          <p className="h5 mb-0 py-1">{room.name}</p>
        </div>
        <div className="px-4 py-5 chat-box bg-white" style={{ overflowY: 'scroll', height: '700px' }} ref={(div) => {
          this.messageList = div;
        }}>
          {this.props.selectedRoomId !== '' ? this.props.messages.map(item => {
            return (
              <TextBubble
                key={item._id}
                mine={item.sender._id === user._id}
                message={item.text}
                date={moment(item.createdAt).fromNow()}
                senderName={item.sender.name || false}
              />
            )
          }) : <p>No Conversation</p>}
        </div>
        <Form className="bg-light" onSubmit={this.onSendMessage}>
          <InputGroup>
            <Input type="text" placeholder="Type a message" disabled={this.props.selectedRoomId === ''} className="rounded-0 border-0 py-4 bg-light" name="text" onChange={this.onChange} value={text} />
            <InputGroupAddon addonType="append">
              <Button id="button-addon2" type="submit" active disabled={this.props.selectedRoomId === ''} onClick={this.onSendMessage}>
                {isSendMessageLoading ? <Spinner size="sm" color="primary" /> : <FontAwesomeIcon icon={faPaperPlane} />}
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Fragment>
    )
  }
}

const mapDispatchToProps = {
  getRoomMessage,
  sendMessageRequest,
  sendMessageSuccess,
}

const mapStateToProps = state => {
  const roomState = state.room;
  return {
    room: roomState.room || {},
    messages: roomState.room.conversation || [],
    user: JSON.parse(localStorage.getItem('user')),
    selectedRoomId: roomState.selectedRoomId || '',
    isSendMessageLoading: roomState.isSendMessageLoading || false,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);  
