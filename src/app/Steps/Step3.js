import React from "react";
import { Answers, Heading, Invitebtn, Stepsection } from "./Stepsstyle";

export default function Step3() {
  return (
    <Stepsection>
      <Heading>
        <p className="stepstage">STEP 3 OF 3</p>
        <p className="heading"> Add your team mates</p>
        <p className="lighttext">
          To give slack a spin, add a few coworkers that you talk to regularly.
        </p>
      </Heading>
      <Answers>
        <div className="field">
          <div>
            <Invitebtn>INVITE TO CRM</Invitebtn>
          </div>
          <div className="team">
            <p className="company"> Member’s Email</p>
          </div>
          <div>
            <input className="input-field" placeholder="emailadess@example.com" />
          </div>
          <div className="check">
          

          </div>
        </div>
      </Answers>
    </Stepsection>
  );
}
