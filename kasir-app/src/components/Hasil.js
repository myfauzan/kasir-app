import axios from 'axios';
import React, {Component} from 'react';
import {Badge, Card, Col, ListGroup, Row} from 'react-bootstrap';
import swal from 'sweetalert';
import {API_URL} from 'utils/constans';
import {numberWithCommas} from 'utils/utils';
import ModalCart from './ModalCart';
import TotalPayment from './TotalPayment';

export default class Hasil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            cartDetail: false,
            qty: 0,
            description: '',
            totalCost: 0
        };
    }

    handleShow = (menuCart) => {
        this.setState({
            showModal: true,
            cartDetail: menuCart,
            qty: menuCart.jumlah,
            description: menuCart.keterangan,
            totalCost: menuCart.total
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false
        });
    };

    increase = () => {
        this.setState({
            qty: this.state.qty + 1,
            totalCost:
                this.state.cartDetail.product.harga * (this.state.qty + 1)
        });
    };

    decrease = () => {
        if (this.state.qty !== 1) {
            this.setState({
                qty: this.state.qty - 1,
                totalCost:
                    this.state.cartDetail.product.harga * (this.state.qty - 1)
            });
        }
    };

    changeHandle = (event) => {
        this.setState({
            description: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.qty,
            total: this.state.totalCost,
            product: this.state.cartDetail.product,
            keterangan: this.state.description
        };

        axios
            .put(API_URL + 'keranjangs/' + this.state.cartDetail.id, data)
            .then((res) => {
                // handle success
                swal({
                    title: 'Success Update',
                    text: 'You update ' + data.product.nama + ' on cart!',
                    icon: 'success',
                    button: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            });
    };

    deleteItem = (id) => {
        this.handleClose();

        axios
            .delete(API_URL + 'keranjangs/' + id)
            .then((res) => {
                // handle success
                swal({
                    title: 'Success Delete',
                    text:
                        'You delete ' +
                        this.state.cartDetail.product.nama +
                        ' on cart!',
                    icon: 'error',
                    button: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            });
    };

    render() {
        const {carts} = this.props;
        return (
            <Col md={3} className="mt-2">
                <h4>
                    <strong>Hasil</strong>
                </h4>
                <hr />
                {carts.length !== 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {carts.map((menuCarts) => (
                                <ListGroup.Item
                                    key={menuCarts.id}
                                    onClick={() => this.handleShow(menuCarts)}>
                                    <Row className="d-flex align-items-start ms-auto me-2">
                                        <Col xs={2}>
                                            <h4>
                                                <Badge bg="success">
                                                    {menuCarts.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col xs={6}>
                                            <h5>{menuCarts.product.nama}</h5>
                                            <p>
                                                Rp.{' '}
                                                {numberWithCommas(
                                                    menuCarts.product.harga
                                                )}
                                            </p>
                                        </Col>
                                        <Col className="d-flex justify-content-end p-0">
                                            <strong>
                                                Rp.{' '}
                                                {numberWithCommas(
                                                    menuCarts.total
                                                )}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <ModalCart
                                handleClose={this.handleClose}
                                {...this.state}
                                increaseQty={this.increase}
                                decreaseQty={this.decrease}
                                changeHandle={this.changeHandle}
                                handleSubmit={this.handleSubmit}
                                deleteItem={this.deleteItem}
                            />
                        </ListGroup>
                    </Card>
                )}
                <TotalPayment carts={carts} {...this.props} />
            </Col>
        );
    }
}
