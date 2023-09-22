import { useEffect, useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { getRequest } from "../services/ApiService";
import { useNavigate } from 'react-router-dom';

const Home = ({setSelectedBook}) => {

    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getRequest("/book")
            setBooks(response.data);

        }

        fetchBooks();
    }, [])

    const handleCardClick = (book) => {
        setSelectedBook(book);
        localStorage.setItem("selectedBook", JSON.stringify(book));
        navigate('/bookDetails');
    };
    
    return (
        <div>
            <Row className="mt-3">
                {books && books.map(book => {
                    return (
                        <Col lg='2' md='4' className="mt-4 py-2" key={book.id}>
                            <div onClick={() => handleCardClick(book)}>
                                <Card style={{ width: '9.5rem' }}>
                                    <Card.Img variant="top" className="cardImg" src={book.image} />
                                    <Card.Body className="text-center pt-1 pb-2 px-2">
                                        <Card.Title className="title"> {book.title} </Card.Title>
                                        <Card.Text className="mb-1 bodyText">
                                            {book.author} <br />
                                            Rs. {book.price.toFixed(2)} <br/>
                                            {book.subcategory.category.name} | {book.subcategory.name}
                                        </Card.Text>
                                        <Button className="addButton" variant="primary" onClick={() => handleCardClick(book)}>View Book</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    )
                })}
            </Row>

        </div>
    )
}

export default Home;