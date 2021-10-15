import React, { useState } from "react";
import "./App.css";

const App = () => {
  let [istrue, setistrue] = useState(false);
  const [otpvalue, setotpvalue] = useState([]);
  const inNo = [0, 1, 2, 3, 4, 5];

  const updateotpvalue = (val, idx) => {
    let newotpvalue = otpvalue;
    newotpvalue[idx] = val;
    setotpvalue(newotpvalue);
  };

  const handleKeyUp = (e, idx) => {
    if (
      e.keyCode === 8 &&
      e.target.previousElementSibling &&
      e.target.previousElementSibling.tagName === "INPUT"
    ) {
      goPrev(e.target, idx);
    } else if (e.keyCode != 8) {
      if (e.target.value.length > 1) {
        handleMultiVal(e.target, e.target.value, idx);
      } else {
        goNext(e.target, idx);
      }
    }
  };
  const goNext = (el, idx) => {
    updateotpvalue(el.value, idx);
    el.nextElementSibling.focus();
    return;
  };
  const goPrev = (el, idx) => {
    updateotpvalue(el.value, idx);
    el.previousElementSibling.focus();
    return;
  };
  const handleMultiVal = (el, val, idx) => {
    el.value = val[0];

    updateotpvalue(el.value, idx);
    const newVal = val.substring(1);
    if (el.nextElementSibling && el.nextElementSibling.tagName === "INPUT") {
      el.nextElementSibling.focus();
      if (newVal.length) {
        handleMultiVal(el.nextElementSibling, newVal, idx + 1);
      }
    }
  };
  return istrue ? (
    <>
      <div className="row">
        <h2>Phone Verification</h2>
        <p className="para">Enter the otp you recieved on 70177-6XXXX</p>
        {inNo.map((val, idx) => {
          return (
            <input
              className="otpvalue-field"
              key={val}
              type="text"
              maxLength={val === 0 ? 6 : 1}
              onKeyUp={(e) => handleKeyUp(e, idx)}
            />
          );
        })}
        <p>
          <a
            href="change number"
            className="but1"
            onClick={(e) => setotpvalue([...otpvalue.map((v) => "")])}
          >
            Change Number
          </a>
          <a
            href="resend otpvalue"
            className="but2"
            onClick={(e) => {
              setotpvalue([...otpvalue.map((v) => "")])
              setistrue(false)
            }}
          >
            Re-send otp
          </a>
          <br />
          <br />
          <button className="but3" onClick={() => console.log(otpvalue)}>
            Verify Otp
          </button>
        </p>
      </div>
    </>
  ) : (

    <div className="firstpage">
      <h2>:Phone Verification:</h2>
      <h4>Click below button to get otp</h4>
      <button id="btnhome"
        onClick={() => {
          setistrue(true);
        }}
      >
        Click Me
      </button>
    </div>
  )
};

export default App;
