import React from "react";
import { Answers, Backbtn, Heading, Nextbtn, Stepsection } from "./Stepsstyle";

export default function Step2() {
  return (
    <Stepsection>
      <Heading>
        <p className="stepstage">STEP 2 OF 3</p>
        <p className="heading"> Whats your team working on right now?</p>
        <p  className="lighttext">This could be anything: a project, campaign, event or the deal.</p>
      </Heading>
      <Answers>
        <div className="field">
        <div className="team">
                <p className="company"> What are you working on?</p>
                <p className="number">0/50</p>
            </div>
            <div>
                <input className="input-field" placeholder="Enter a name"/>
            </div>
            <div className="btns">
                <Backbtn>Back</Backbtn>
                <Nextbtn>Next</Nextbtn>

            </div>

        </div>

      </Answers>
    </Stepsection>
  );
}
