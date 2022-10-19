import React, { useState }  from "react"
import axios from "axios";
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Container, Section, Text, SuperHeading } from "../components/ui"

const MyForm = () => {
    
    const [serverState, setServerState] = useState({
      submitting: false,
      status: null
    });
    const handleServerResponse = (ok, msg, form) => {
      setServerState({
        submitting: false,
        status: { ok, msg }
      });
      if (ok) {
        form.reset();
      }
    };
    const handleOnSubmit = e => {
      e.preventDefault();
      const form = e.target;
      setServerState({ submitting: true });
      axios({
        method: "post",
        url: "https://getform.io/f/97b71157-0a10-43e2-a3a5-ac837f5d2602",
        data: new FormData(form)
      })
        .then(r => {
          handleServerResponse(true, "Takk fyrir, við verðum í sambandi við þig!", form);
        })
        .catch(r => {
          handleServerResponse(false, r.response.data.error, form);
        });
    };
    return (
      <Layout>
       <Section>
        <Container>
        <div>
         <div>
            <h3>Viltu fá frekari upplýsingar um okkur.  Fylltu út þetta form og við verðum í sambandi við þig eins fljótt og auðið er.</h3>
            <form onSubmit={handleOnSubmit}>
            <br></br>
            <div className="form-group">
                <label for="exampleInputName">Fullt nafn</label>
                <input type="text" name="name" className="form-control" id="exampleInputName" placeholder="" required="required"/>
            </div>
            <br></br>
            <div className="form-group">
                <label for="exampleInputEmail1" required="required">Netfang</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
            </div> 
            <br></br>
            <button type="submit" className="btn btn-primary"  disabled={serverState.submitting}>
                Staðfesta
            </button>
            {serverState.status && (
                <p className={!serverState.status.ok ? "errorMsg" : ""}>
                {serverState.status.msg}
                </p>
            )}
            </form>
        </div>
      </div>  
      </Container>
    </Section>
  </Layout>
     
    );
  };
  
  export default MyForm;