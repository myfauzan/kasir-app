import axios from 'axios';
import React, {Component} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import swal from 'sweetalert';
import '../App.css';
import {Hasil, ListCategories, Menus} from '../components';
import {API_URL} from '../utils/constans';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            chooseCategory: 'Makanan',
            carts: []
        };
    }

    componentDidMount() {
        axios
            .get(
                API_URL + 'products?category.nama=' + this.state.chooseCategory
            )
            .then((res) => {
                // handle success

                const menus = res.data;
                this.setState({menus});
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            });

        axios
            .get(API_URL + 'keranjangs')
            .then((res) => {
                // handle success
                const carts = res.data;
                this.setState({carts});
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            });
    }

    componentDidUpdate(prevState) {
        if (this.state.carts !== prevState.carts) {
            axios
                .get(API_URL + 'keranjangs')
                .then((res) => {
                    // handle success
                    const carts = res.data;
                    this.setState({carts});
                })
                .catch((error) => {
                    // handle error
                    console.log('Error nya', error);
                });
        }
    }

    changeCategory = (value) => {
        this.setState({
            chooseCategory: value,
            menus: []
        });

        axios
            .get(API_URL + 'products?category.nama=' + value)
            .then((res) => {
                // handle success

                const menus = res.data;
                this.setState({menus});
                console.log(res);
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            });
    };

    enterCart = (value) => {
        axios
            .get(API_URL + 'keranjangs?product.id=' + value.id)
            .then((res) => {
                // handle success
                if (res.data.length === 0) {
                    const cart = {
                        jumlah: 1,
                        total: value.harga,
                        product: value
                    };

                    axios
                        .post(API_URL + 'keranjangs', cart)
                        .then((res) => {
                            // handle success
                            swal({
                                title: 'Success',
                                text:
                                    'You add ' +
                                    cart.product.nama +
                                    ' to cart!',
                                icon: 'success',
                                button: false,
                                timer: 1500
                            });
                        })
                        .catch((error) => {
                            // handle error
                            console.log('Error nya', error);
                        });
                } else {
                    const cart = {
                        jumlah: res.data[0].jumlah + 1,
                        total: res.data[0].total + value.harga,
                        product: value
                    };

                    axios
                        .put(API_URL + 'keranjangs/' + res.data[0].id, cart)
                        .then((res) => {
                            // handle success
                            swal({
                                title: 'Success',
                                text:
                                    'You add ' +
                                    cart.product.nama +
                                    ' to cart!',
                                icon: 'success',
                                button: false,
                                timer: 1500
                            });
                        })
                        .catch((error) => {
                            // handle error
                            console.log('Error nya', error);
                        });
                }
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            });
    };

    render() {
        const {menus, chooseCategory, carts} = this.state;
        return (
            <div className="mt-3">
                <Container fluid>
                    <Row>
                        <ListCategories
                            changeCategory={this.changeCategory}
                            chooseCategory={chooseCategory}
                        />
                        <Col className="mt-2">
                            <h4>
                                <strong>Daftar Produk</strong>
                            </h4>
                            <hr />
                            <Row className="overflow-auto menu">
                                {menus &&
                                    menus.map((menu) => (
                                        <Menus
                                            key={menu.id}
                                            menu={menu}
                                            enterCart={this.enterCart}
                                        />
                                    ))}
                            </Row>
                        </Col>
                        <Hasil carts={carts} {...this.props} />
                    </Row>
                </Container>
            </div>
        );
    }
}
