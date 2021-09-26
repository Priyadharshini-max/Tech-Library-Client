import { useParams, useHistory } from "react-router-dom";
import Withnav from "../Components/withNavbar";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify';


function LanguageDetails() {
  const params = useParams();
  const history = useHistory();

  const [state, setState] = useState({
    alldata: [],
  });

  // Check user authorized or not
  useEffect(() => {
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
      var { data } = await axios.get("http://localhost:3001/alldata", {
        headers: {
          "access-token": localStorage.getItem("Token")
        }
      });
      setState({ ...state, alldata: data });
    }
    catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container className="allDataContainer">

      <h1 className="heading">{params.name} Tutorial</h1><br /><br />
      {state.alldata.filter((value) => {
        return value.language === params.name
      }).map((item, index) => {
        return (
          <div key={index}>
            <h2 className="topics" >{item.heading}</h2>
            <hr />
            <h4>{item.explanation}</h4><br />
            <h5>{item["brief explanation"]}</h5><br /><br />
          </div>
        )
      })}
    </Container>
  );
}

export default Withnav(LanguageDetails);



