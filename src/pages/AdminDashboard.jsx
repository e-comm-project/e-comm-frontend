import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";



function AdminDashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = await db.collection("users").get();
                setUsers(
                    usersCollection.docs.map((doc) => {
                        return doc.data();
                    })
                );
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }
    , []);
    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    }
    if (loading) {
        return <h1>Loading...</h1>;
    }
        

      return {
        
        <Container> 
            <Row>
                <Col>
                    <h1>Admin Dashboard</h1>
                </Col>
                <Col>
                    <Button variant="link" onClick={handleLogout}>
                        Log Out
                    </Button>
                </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {users.map((user, index) => (
                    <Col key={index} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.email}</Card.Title>
                                <Card.Text>
                                    {user.isAdmin ? "Admin" : "User"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>;
        </Container>
    };
       

}

export default AdminDashboard;
