import { Container, Button } from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";

const API_URL = "https://tech-library-api.herokuapp.com/auth/resetpassword";

export default function ResetPassword() {
    const { token } = useParams();

    const [state, setState] = useState({
        password: "",
    })
    const history = useHistory();
    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.password === "") {
            alert("Please enter your new password");
        } else {
            try {
                const { password } = state
                const { data } = await axios.post(API_URL, {
                    token,
                    password
                })
                setState({ ...state, password: "" });
                history.push('/login');
                toast.success(data.message)
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }
    return (
        <div className="PWmainDiv">
            <Container>
                <form>
                    <label className="newPasswordLabel">New Password :  </label><br /><br />
                    <input type="password" name="password" value={state.password} onChange={handleChange}
                        required /><br /><br />
                    <Button variant="primary" type="submit" onClick={handleSubmit}  >
                        Submit
                    </Button>
                </form>
            </Container>
        </div >
    )
}










