import { useNavigate } from "react-router";
//import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const BookCard = ({ book, setSelectedBook }) => {
    const navigate = useNavigate();

    const handleCardClick = (book) => {
        setSelectedBook(book);
        localStorage.setItem("selectedBook", JSON.stringify(book));
        navigate('/bookDetails');
    };

    return (

    
        <Card style={{ width: '9.5rem', cursor:'pointer' }} onClick={() => handleCardClick(book)}>
            <Card.Img variant="top" className="cardImg" src={book.image} />
            <Card.Body className="text-center pt-1 pb-2 px-2">
                <Card.Title className="title"> {book.title} </Card.Title>
                <Card.Text className="mb-1 bodyText">
                    {book.author} <br />
                    Rs. {book.price.toFixed(2)} <br />
                    {book.subcategory.category.name} | {book.subcategory.name} 
                </Card.Text>
                {/* <Button className="addButton" variant="primary" onClick={() => handleCardClick(book)}>View Book</Button> */}
            </Card.Body>
        </Card>
    )
}

export default BookCard;