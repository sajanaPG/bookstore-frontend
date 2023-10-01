import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const [registerDisabled, setRegisterDisabled] = useState(true);

    const [show, setShow] = useState(false);

    const allowRegister = () => {
        const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (
            email !== "" && regex.test(email) && 
            password.length >= 6 && 
            firstname !== "" &&
            lastname !== "" &&
            phone !== "" &&
            phone.charAt(0)==='0' && phone.length===9       
        ) {
            setRegisterDisabled(false);
        } else {
            setRegisterDisabled(true);
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
        allowRegister();
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
        allowRegister();
    };

    const handleFirstname = (event) => {
        setFirstname(event.target.value);
        allowRegister();
    };

    const handleLastname = (event) => {
        setLastname(event.target.value);
        allowRegister();
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
        allowRegister();
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const data = {
            "email": email,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "phone": phone,
            "role": "ROLE_USER"
        }

        try {
            await axios.post("http://localhost:9000/auth/register", data);
            setError("");
            setShow(true);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <>
            <Container>
                <div className="login-box shadow sm rouded">
                    <div className="text-center mb-4">
                        <h2>User Register</h2>
                    </div>

                    <Form onSubmit={handleRegister}>
                        <FloatingLabel controlId='email' label="Enter Your Email Address" className='mb-3'>
                            <Form.Control type="email" placeholder='Select a Username' value={email} onChange={handleEmail} />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Select a Password" className="mb-3">
                            <Form.Control type="password" placeholder="Select a Password" value={password} onChange={handlePassword}></Form.Control>
                        </FloatingLabel>

                        <FloatingLabel controlId="firstname" label="Enter Your First Name" className="mb-3">
                            <Form.Control placeholder="Enter Your First Name" value={firstname} onChange={handleFirstname}></Form.Control>
                        </FloatingLabel>

                        <FloatingLabel controlId="lastname" label="Enter Your Last Name" className="mb-3">
                            <Form.Control placeholder="Enter Your Last Name" value={lastname} onChange={handleLastname}></Form.Control>
                        </FloatingLabel>

                        <FloatingLabel controlId="phone" label="Enter Your Phone Number" className="mb-3">
                            <Form.Control placeholder="Enter Your Phone Number" value={phone} onChange={handlePhone}></Form.Control>
                        </FloatingLabel>

                        {error &&
                            <div className="text-danger mb-3 mx-1">
                                {error}
                            </div>
                        }
                        <p>Allready have an acoount: <a href="/login">Login</a></p>
                        

                        <div className="text-end">
                            <Button type="submit" variant="primary" className="auth-button" disabled={registerDisabled}>Register</Button>
                        </div>
                    </Form>
                </div>
            </Container>

            <Modal show={show} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>User Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        User Registered Successfuly. Please Login!
                    </div>

                    <div className="text-end">
                        <Button variant="primary" className="cartButton" onClick={() => {
                            navigate("/login");
                        }}>Login</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Register;