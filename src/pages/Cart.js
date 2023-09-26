import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { decreaseCart, increaseCart, removeFromCart, clearCart, getTotal } from "../features/cartSlice";
import { useEffect } from "react";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increment = (item) => {
        dispatch(increaseCart(item));
    }

    const decrement = (item) => {
        dispatch(decreaseCart(item));
    }

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    }

    useEffect(() => {
        dispatch(getTotal());
    }, [cart,dispatch]);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="mx-4">
            <h2 className="text-center mb-5">Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <div className="text-center">
                    <h4>Your cart looks empty</h4>
                    <div className="start-shopping">
                        <Link to="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                            <span>  Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <Row>
                        <Col lg="4" className="px-3">
                            <h5>Title</h5>
                        </Col>
                        <Col lg="2" className="text-end px-5">
                            <h5>Unit Price</h5>
                        </Col>
                        <Col lg="3" className="text-center">
                            <h5>Quantity</h5>
                        </Col>
                        <Col className="text-end px-5">
                            <h5>Subtotal</h5>
                        </Col>
                    </Row>

                    {cart.cartItems && cart.cartItems.map(item => {
                        return (
                            <Row key={item.id} className="cart-item">
                                <Col lg="4">
                                    <Row>
                                        <Col lg="auto">
                                            <Image src={item.image} alt={item.name} rounded className="cartItem-image"></Image>
                                        </Col>
                                        <Col lg={true}>
                                            <div className="text-uppercase">
                                                {item.title}
                                            </div>
                                            <div>
                                                {item.category} | {item.subcategory}
                                            </div>
                                            <Button variant="outline-secondary" className="remove-button" onClick={() => handleRemove(item)}>Remove</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg="2" className="text-end px-5">
                                    Rs. {item.price.toFixed(2)}
                                </Col>
                                <Col lg="3" className="d-flex justify-content-center">
                                    <Stack direction="horizontal" gap={2}>
                                        <Button variant='light' className='px-4 py-2' onClick={() => decrement(item)}>-</Button>
                                        <label className='px-3 py-2 bg-light text-dark rounded align-middle'> {item.qty} </label>
                                        <Button variant='light' className='px-4 py-2' onClick={() => increment(item)}>+</Button>
                                    </Stack>
                                </Col>
                                <Col className="text-end px-5 cart-subtotal">
                                    Rs. {(item.price * item.qty).toFixed(2)}
                                    
                                </Col>
                            </Row>
                        )
                    })}
                    <div className="cart-summary">
                        <Stack direction="horizontal" gap={3}>
                            <Button variant="outline-secondary" className="clear-button" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                            <div className="ms-auto cart-total">
                                Total
                            </div>
                            <div className="cart-total">
                                Rs. {cart.cartTotalAmount.toFixed(2)}                                
                            </div>
                        </Stack>

                        <div>
                            <Row>
                                <Col md={{ offset: 10 }} className="text-end px-5 my-2">
                                    <Button variant="primary" className="cartButton" onClick={handleCheckout}>Check Out</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={{ span: 3, offset: 9 }} className="text-end px-5 my-2">

                                    <Link to="/" className="continue-shopping">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-arrow-left"
                                            viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                        </svg>
                                        <span>  Continue Shopping</span>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart;