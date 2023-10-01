import { useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    } 

    const handleLogin = async (event) => {
        event.preventDefault();

        const data = {
            "email": email,
            "password": password
        }

        try {
            const response = await axios.post("http://localhost:9000/auth/login", data);
            setError("");
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('email',response.data.email);
            sessionStorage.setItem('user_id',response.data.id);
            sessionStorage.setItem('role',response.data.role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            navigate("/");
        } catch (error) {
            setError("Email or Password is incorrect");
        }
    }

    return (
        <Container>
                <div className="login-box shadow sm rouded">
                    <div className="text-center mb-4">
                        <h2>User Login</h2>
                    </div>

                    <Form onSubmit={handleLogin}>
                        <FloatingLabel controlId='email' label="Enter your Email" className='mb-3'>
                            <Form.Control required placeholder='Enter Your Email' value={email} onChange={handleEmail} />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Select a Password" className="mb-3">
                            <Form.Control required type="password" placeholder="Enter Your Password" value={password} onChange={handlePassword}></Form.Control>
                        </FloatingLabel>

                        {error &&
                            <div className="text-danger mb-3 mx-1">
                                {error}
                            </div>
                        }
                        <p>New user?  <a href="/register">Register Now</a></p>                        

                        <div className="text-end">
                            <Button type="submit" variant="primary" className="auth-button">Login</Button>
                        </div>
                    </Form>
                </div>
            </Container>
    )
}
export default Login;