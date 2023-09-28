import { useEffect, useState } from "react";
import { Row, Col, Button, Nav } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { getRequest } from "../services/ApiService";
import { useNavigate } from 'react-router-dom';

const Home = ({ setSelectedBook }) => {

    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [catId,setCatid] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getRequest("/book")
            setBooks(response.data);
            setFilteredBooks(response.data);
        };

        const fetchCategories = async () => {
            const response = await getRequest("/category");
            setCategories(response.data);
        };

        const fetchSubcategories = async () => {
            const response = await getRequest("/subcategory");
            setSubcategories(response.data);
        };

        fetchBooks();
        fetchCategories();
        fetchSubcategories();
    }, []);

    const filterBooksByCatId = (catId) => {
        const bookFilter = books.filter(book => {
            return book.subcategory.category.id === catId;
        })
        setFilteredBooks(bookFilter);
    }

    const handleCategoryNav = (selectedCategoryId) => {
        if (selectedCategoryId !== 0) {
            //Filter subcategories by category
            setFilteredSubcategories(subcategories);
            const subFilter = subcategories.filter(subcat => {
                return subcat.category.id === selectedCategoryId;
            });
            setFilteredSubcategories(subFilter);

            filterBooksByCatId(selectedCategoryId);
            setCatid(selectedCategoryId); //To be used in handleSubCatNav

        } else {
            //Filter function when All is selected for Category
            setFilteredSubcategories([]);
            setFilteredBooks(books);
        };
    };

    const handleSubCatNav = (selectedSubId) => {
        if (selectedSubId !== 0) {
            //Filter books by subcategory
            const filtered = books.filter(book => {
                return book.subcategory.id === selectedSubId;
            });
            setFilteredBooks(filtered);
        } else {            
            filterBooksByCatId(catId)
        };
    };


    const handleCardClick = (book) => {
        setSelectedBook(book);
        localStorage.setItem("selectedBook", JSON.stringify(book));
        navigate('/bookDetails');
    };

    return (
        <div>

            <div className="text-center">
                <h3 className="mb-2">Categories</h3>

                <Nav justify variant="pills" defaultActiveKey="0" onSelect={(selectedKey) => handleCategoryNav(parseInt(selectedKey))}>
                    <Nav.Item className="nav-item">
                        <Nav.Link eventKey="0">All</Nav.Link>
                    </Nav.Item>
                    {categories && categories.map((category) => {
                        return (
                            <Nav.Item className="nav-item" key={category.id}>
                                <Nav.Link eventKey={category.id}>{category.name}</Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>

                {filteredSubcategories.length > 0 &&
                    <div>
                        <h4 className="mt-4 mb-2">Subcategories</h4>
                        <Nav justify variant="tabs" defaultActiveKey={0} onSelect={(selectedKey) => handleSubCatNav(parseInt(selectedKey))}>
                            <Nav.Item className="nav-item">
                                <Nav.Link eventKey='0'>All</Nav.Link>
                            </Nav.Item>
                            {filteredSubcategories && filteredSubcategories.map((subcategory) => {
                                return (
                                    <Nav.Item className="nav-item" key={subcategory.id}>
                                        <Nav.Link eventKey={subcategory.id}>{subcategory.name}</Nav.Link>
                                    </Nav.Item>
                                )
                            })}
                        </Nav>
                    </div>
                }
            </div>

            <Row className="mt-3">
                {filteredBooks.length>0 ? filteredBooks.map(book => {
                    return (
                        <Col lg='2' md='4' xs='6' className="mt-4 py-2" key={book.id}>
                            <div onClick={() => handleCardClick(book)}>
                                <Card style={{ width: '9.5rem' }}>
                                    <Card.Img variant="top" className="cardImg" src={book.image} />
                                    <Card.Body className="text-center pt-1 pb-2 px-2">
                                        <Card.Title className="title"> {book.title} </Card.Title>
                                        <Card.Text className="mb-1 bodyText">
                                            {book.author} <br />
                                            Rs. {book.price.toFixed(2)} <br />
                                            {book.subcategory.category.name} | {book.subcategory.name}
                                        </Card.Text>
                                        <Button className="addButton" variant="primary" onClick={() => handleCardClick(book)}>View Book</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    )
                })
                : <div className="text-center mt-5 py-5">
                    <h5>No books available</h5>
                </div>
                }
            </Row>

        </div>
    )
}


export default Home;