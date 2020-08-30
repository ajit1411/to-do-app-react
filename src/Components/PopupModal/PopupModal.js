import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const PopupModal = ({
    header,
    content,
    toggle,
    customClass = 'modal-dialog'
}) => {
    const [show, setshow] = useState(false)
    return (
        <React.Fragment>
            <Modal size={'lg'} show={show} onHide={() => setshow(false)}>
                <Modal.Header closeButton={true}>
                    {
                        header
                    }
                </Modal.Header>
                <Modal.Body>
                    {
                        content
                    }
                </Modal.Body>
            </Modal>
            {
                toggle ? (
                    <span onClick={() => setshow(true)}>
                        {
                            toggle
                        }
                    </span>
                ) : (
                        <button className={'btn btn-success'} onClick={() => setshow(true)}>
                            Open
                        </button>
                    )
            }
        </React.Fragment>
    )
}

export default PopupModal
