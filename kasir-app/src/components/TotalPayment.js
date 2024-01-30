import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import {Button, Col, Row, Stack} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {API_URL} from 'utils/constans';
import {numberWithCommas} from 'utils/utils';

const TotalPayment = ({carts}) => {
    const navigate = useNavigate();

    const submitTotalPayment = (TotalPayment) => {
        const queue = {
            total: TotalPayment,
            menus: carts
        };

        axios.post(API_URL + 'pesanans', queue).then((res) => {
            navigate('/success');
        });
    };

    const totalPayment = carts.reduce(function (result, item) {
        return result + item.total;
    }, 0);

    return (
        <>
            {/* Web */}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{span: 3, offset: 9}} className="p-4 d-grid gap-1">
                        <Stack direction="horizontal" gap={2}>
                            <h4>Total Bayar : </h4>
                            <h4 className="ms-auto">
                                <strong className="me-2">
                                    Rp. {numberWithCommas(totalPayment)}
                                </strong>
                            </h4>
                        </Stack>

                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => submitTotalPayment(totalPayment)}>
                            <FontAwesomeIcon icon={faShoppingCart} />{' '}
                            <strong>Pay</strong>
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Mobile */}
            <div className="d-lg-none d-sm-none d-md-block">
                <Row>
                    <Col md={{span: 3, offset: 9}} className="p-4 d-grid gap-1">
                        <Stack direction="horizontal" gap={2}>
                            <h4>Total Bayar : </h4>
                            <h4 className="ms-auto">
                                <strong className="me-2">
                                    Rp. {numberWithCommas(totalPayment)}
                                </strong>
                            </h4>
                        </Stack>

                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => submitTotalPayment(totalPayment)}>
                            <FontAwesomeIcon icon={faShoppingCart} />{' '}
                            <strong>Pay</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default TotalPayment;
