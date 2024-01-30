import {
    faCheese,
    faCoffee,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, {Component} from 'react';
import {Col, ListGroup} from 'react-bootstrap';
import {API_URL} from 'utils/constans';

const Icon = ({nama}) => {
    if (nama === 'Makanan')
        return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (nama === 'Minuman')
        return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
    if (nama === 'Cemilan')
        return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
};

export default class ListCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + 'categories')
            .then((res) => {
                // handle success

                const categories = res.data;
                this.setState({categories});
            })
            .catch((error) => {
                // handle error
                console.log('Error nya', error);
            })
            .finally(function () {
                // always executed
            });
    }

    render() {
        const {categories} = this.state;
        const {changeCategory, chooseCategory} = this.props;
        return (
            <Col md={2} className="mt-2">
                <h4>
                    <strong>Daftar Ketegori</strong>
                </h4>
                <hr />
                <ListGroup>
                    {categories &&
                        categories.map((category) => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => changeCategory(category.nama)}
                                className={
                                    chooseCategory === category.nama &&
                                    'categroy-active'
                                }
                                style={{cursor: 'pointer'}}>
                                <h5>
                                    <Icon nama={category.nama} />{' '}
                                    {category.nama}
                                </h5>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Col>
        );
    }
}
