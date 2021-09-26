import React, { useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import Categories from "../Data/Categories.data"
import Withnav from "../Components/withNavbar"
import { toast } from 'react-toastify';

function CategoriesDetails(props) {
    const CategoriesList = Categories;
    const history = useHistory();
    const token = localStorage.getItem("Token");

    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            history.push({
                pathname: '/login'
            });
        }

    }, []);

    const checkdisable = (language) => {
        if (token) {
            history.push({
                pathname: `/languagedetails/${language}`,
            });
        } else {
            toast.error("Unauthorized User");
        }

    }

    return (
        <Container className="ItemContainer">
            <Row md={4} className="g-4">
                {CategoriesList.map((item, index) => {
                    return (
                        <Col key={index}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.language}</Card.Title>

                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="secondary" size="sm" onClick={() => checkdisable(item.language)}>{item.start}</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Withnav(CategoriesDetails);


