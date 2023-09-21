import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const BookDetails = ({ selectedBook }) => {

    const [count, setCount] = useState(1);
    const dispatch = useDispatch();

    const increment = () => {
        if (count<10) {
            setCount(count+1);
        }
    }

    const decrement = () => {
        if (count>1) {
            setCount(count-1);
        }
    }

    const handleAddCart = (book) => {
        const data = {
            "id": book.id,
            "title": book.title,
            "price": book.price,
            "qty": count
        }
        dispatch(addToCart(data));
    }
    return (
        <div className="detail-box">
            <div className="detail-text">
                <Row>
                    <h3 className='text-uppercase'>{selectedBook.title}</h3>
                    <h5>Rs. {selectedBook.price.toFixed(2)}</h5>
                    <Col lg="5">

                        <p className='my-3'>
                            Author: {selectedBook.author} <br />
                            Category: {selectedBook.subcategory.category.name} <br />
                            Subcategory: {selectedBook.subcategory.name} <br />
                        </p>
                    </Col>

                    <Col lg="7" className='my-3'>
                        <p>
                            {selectedBook.description}
                        </p>
                    </Col>
                </Row>
                
                <div className='d-flex my-4'>

                    <Button variant='light' className='px-4 py-2 mr-3' onClick={decrement}>-</Button> 

                    <label className='px-3 py-2 mx-2 bg-light text-dark rounded align-middle'> {count} </label> 

                    <Button variant='light' className='px-4 py-2 mr-2' onClick={increment}>+</Button> 

                    <Button className='cartButton' variant='primary' onClick={()=>handleAddCart(selectedBook)}>ADD TO CART</Button>
                </div>
                

            </div>

            <div className="detail-img">
                <img src={selectedBook.image} alt="coverImage" className="coverImg" />
            </div>


        </div>


    )
}

export default BookDetails;