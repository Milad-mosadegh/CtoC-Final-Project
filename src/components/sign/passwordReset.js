import React,{useState} from 'react';
import {Button, Modal, } from "react-bootstrap"

export default function PasswordReset(props) {
    const [showModal, setShowModal] = useState(props.showModal);
    const {closeModal, openModal}   = props

    return (
      <div>
        <Modal show={showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={showModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
 