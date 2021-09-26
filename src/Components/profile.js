import { useParams, useHistory } from "react-router-dom";
import Withnav from "../Components/withNavbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap';

function Profile() {
    const [state, setState] = useState({
        username: "",
        email: ""
    })
    const history = useHistory();

    //Check user authorized or not
    useEffect(() => {
        console.log("ComponentDidMount is Called....");
        if (localStorage.getItem("Token")) {
            getUser();
        } else {
            history.push({
                pathname: '/login'
            });
        }
    }, []);

    const getUser = async () => {
        try {
            var { data } = await axios.get("http://localhost:3001/profile", {
                headers: {
                    "access-token": localStorage.getItem("Token")
                }
            });

            setState({ ...state, username: data.username, email: data.email });
            console.log("getusers", data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className="profileContainer">
            <h3 className="profileHeading">User Details</h3><br />
            <h5>User Name - {state.username} </h5>
            <h5>Email ID - {state.email}</h5>
        </Container>
    );
}

export default Withnav(Profile);


