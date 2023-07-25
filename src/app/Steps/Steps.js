import React from "react";
import styled from "styled-components";


import Step3 from "./Step3";

export default function Steps() {
  return <Stepswrapeer>
    {/* <Step1/> */}
    {/* <Step2/> */}
    <Step3/>

  </Stepswrapeer>;
}
const Stepswrapeer = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height:100vh;


`;
