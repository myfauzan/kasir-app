import {faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import {numberWithCommas} from 'utils/utils';

const ModalCart = ({
    showModal,
    handleClose,
    cartDetail,
    qty,
    description,
    increaseQty,
    decreaseQty,
    changeHandle,
    handleSubmit,
    totalCost,
    deleteItem
}) => {
    if (cartDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cartDetail.product.nama}{' '}
                        <strong>
                            (Rp. {numberWithCommas(cartDetail.total)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Cost :</Form.Label>
                            <p>
                                <strong>
                                    Rp. {numberWithCommas(totalCost)}
                                </strong>
                            </p>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1">
                            <Form.Label>Qty : </Form.Label>
                            <br />
                            <Button
                                variant="primary"
                                size="sm"
                                className="me-2"
                                onClick={() => decreaseQty()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>{qty}</strong>
                            <Button
                                variant="primary"
                                size="sm"
                                className="ms-2"
                                onClick={() => increaseQty()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Examples: Spicy"
                                value={description}
                                onChange={(event) => changeHandle(event)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        className="me-auto"
                        onClick={() => deleteItem(cartDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return;
    }
};

export default ModalCart;
