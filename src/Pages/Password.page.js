import { Container, Button } from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = "http://localhost:3001/auth/forgotpassword";

export default function Password() {
    const [state, setState] = useState({
        email: "",

    })

    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state.email);
        if (state.email === "") {
            alert("Please enter your mail id");
        } else {
            try {
                const { email } = state;
                const { data } = await axios.post(API_URL, {
                    email
                });
                setState({ ...state, email: "" });
                console.log(data.message);
                toast.success(data.message);
            }
            catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }
    return (
        <div className="PWmainDiv">
            <Container>
                <form>
                    <label>Email Id :  </label><br /><br />
                    <input type="email" name="email" value={state.email} onChange={handleChange}
                        required /><br /><br />
                    <Button className="ResetBtn" variant="primary" type="submit" onClick={handleSubmit} >
                        Reset Password
                    </Button>
                </form>
            </Container>
        </div>

    )
}
