import React from 'react';
import { Modal, Button } from 'react-bootstrap'


const MyModal = ({ showModel, handleClose, title, description, image }) => {

    return (
        <div>
            <Modal show={showModel} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>
                        {description}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyModal;