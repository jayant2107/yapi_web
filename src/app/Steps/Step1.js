import React from "react";

import { Answers, Heading, Nextbtn, Stepsection } from "./Stepsstyle";

export default function Step1() {
  return (
    <Stepsection>
        <Heading>

      <p className="stepstage">STEP 1 OF 3</p>
      <p className="heading"> What’s the name of your team or company</p>
      <p className="lighttext"> This will be the name of your yapi workspace- choose something that your team will recognise</p>
        </Heading>
        <Answers>
            <div className="field">

            <div className="team">
                <p className="company"> TEAM OR COMPANY NAME</p>
                <p className="number">0/50</p>
            </div>
            <div>
                <input className="input-field" placeholder="Enter a name"/>
            </div>
            <div className="check">
                <input type="checkbox"/>
                <p>Let anyone with an @ email address join this workspace.</p>
            </div>
            <Nextbtn>NEXT</Nextbtn>
            </div>
            


        </Answers>
    </Stepsection>
  );
}
