import React from 'react'
import { UncontrolledTooltip, Row, Col, Form, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { CustomContainer, RoomCard, TextBubble } from '../components';

export default function HomePage() {
  return (
    <CustomContainer>
      <Row className="overflow-hidden shadow" style={{ borderRadius: '0.5rem' }}>
        <Col sm={5} className="px-0">
          <div className="bg-white" style={{ height: '700px' }} >
            <div className="bg-gray px-4 py-2 bg-light d-flex">
              <p className="h5 mb-0 py-1">Recent</p>
              <div style={{
                right: '0',
                position: 'absolute',
                marginRight: '20px',
              }}>
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
                <a className="list-group-item list-group-item-action active text-white rounded-0">
                  <div className="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" className="rounded-circle" />
                    <div className="media-body ml-4">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h6 className="mb-0">Jason Doe</h6><small className="small font-weight-bold">25 Dec</small>
                      </div>
                      <p className="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                    </div>
                  </div>
                </a>
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

  )
}
