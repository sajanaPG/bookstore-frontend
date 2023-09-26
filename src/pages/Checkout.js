import { useState } from "react";
import { Col, Row, Button, Stack, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { postRequest } from "../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { emptyCart } from "../features/cartSlice";

const Checkout = () => {
    const cart = useSelector(state => state.cart);
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleOrder = async (event) => {
        event.preventDefault();
        if (address !== "") {

            //Post Order
            const orderData = {
                "address": address,
                "total": cart.cartTotalAmount,
                "status": "Pending",
                "user": {
                    "id": sessionStorage.getItem("user_id")
                }
            };
            const response = await postRequest("/order", orderData);

            if (response && response.status === 201) {
                const orderId = response.data.id;
                //Post orderdetails
                for (const item of cart.cartItems) {
                    const orderdetailData = {
                        "quantity": item.qty,
                        "subTotal": item.price * item.qty,
                        "book": {
                            "id": item.id
                        },
                        "order": {
                            "id": orderId
                        }
                    };

                    await postRequest("/orderdetail", orderdetailData);
                };

                toast.success(`Order placed successfuly`, {
                    position: "top-center",
                });

                localStorage.clear();
                dispatch(emptyCart());
                navigate('/')

            } else {
                toast.error(`Order place failed `, {
                    position: "bottom-left",
                });
            };

        } else {
            event.stopPropagation();
        };
    };

    return (
        <>
            <h2 className="text-center mb-5">Checkout</h2>
            <div>
                <Row>
                    <Col lg="3" xs="2" className="px-3">
                        <h5>Item</h5>
                    </Col>
                    <Col lg="3" xs="2" className="text-center">
                        <h5>Quantity</h5>
                    </Col>
                    <Col lg="3" xs="2" className="text-end px-5">
                        <h5>Unit Price</h5>
                    </Col>
                    <Col className="text-end px-5">
                        <h5>Subtotal</h5>
                    </Col>
                </Row>

                {cart.cartItems && cart.cartItems.map(item => {
                    return (
                        <Row key={item.id} className="cart-item">
                            <Col lg="3" xs="3">
                                <div className="text-uppercase">
                                    {item.title}
                                </div>
                            </Col>
                            <Col lg="3" xs="2" className="d-flex justify-content-center">
                                <div>
                                    {item.qty}
                                </div>
                            </Col>
                            <Col lg="3" xs="2" className="text-end px-5">
                                Rs. {item.price.toFixed(2)}
                            </Col>
                            <Col className="text-end px-5 cart-subtotal">
                                Rs. {(item.price * item.qty).toFixed(2)}
                            </Col>
                        </Row>
                    )
                })}

                <Stack direction="horizontal" className="checkout-total">
                    <div className="cart-total ms-auto">
                        Rs. {cart.cartTotalAmount.toFixed(2)}
                    </div>
                </Stack>

                <div className="checkout-submit">
                    <Form onSubmit={handleOrder}>
                        <Stack direction="horizontal" gap={5} className="align-items-end">
                            <div className="checkout-address">
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label>Enter your shipping address</Form.Label>
                                    <Form.Control required as="textarea" rows={3} value={address} onChange={handleAddress} />
                                </Form.Group>
                            </div>

                            <div className="ms-auto px-4 py-2">
                                <Button type="submit" variant="primary" className="cartButton">Place Order</Button>
                            </div>
                        </Stack>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Checkout;