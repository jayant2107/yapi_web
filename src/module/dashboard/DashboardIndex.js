import React from "react";
import { BusinessContent, DashboardCardsBox, DashboardWrapper } from "./DashboardStyle";
import CxcHeader from "../../components/CxcHeader";
import ResponsiveHeader from "../../components/ResponsiveHeader";
import SubHeader from "../../components/SubHeader";
import { LossIcon, ProfitIcon } from "../../utils/Icons/SvgIcons";
import { EstimatedClosed, HoursSaved, TotalJobs, Totalestimates } from "../../utils/Images/Images";
import AreaChart from "../../components/Chart";
import styled from "styled-components";
import MiniChart from "../../components/MiniChart";
// import AreaChart from "../../components/Chart";

export default function DashboardIndex() {
  return (
    <DashboardWrapper>
      <CxcHeader headerName="Dashboard" isFilter={false} isDateBtn={true} />
      <ResponsiveHeader backArrow={false} />
      <SubHeader headerName="Dashboard" isFilter={false} isDateBtn={true} />

      <div className="content">
        <DashboardCardsBox>
          <div className="cards">
            <div className="info">
              <h4>Total saved</h4>
              <h1>$5,765</h1>
              <div className="profit-loss">
                <ProfitIcon />
                <p>3.2%</p>
              </div>
            </div>
            <div className="graph">
              {miniGraph?.map((list, index) => (
                <div key={index}>
                  <MiniChart labels={list.labels} values={list.values} />
                </div>
              ))}
            </div>
          </div>
          <div className="cards">
            <div className="info">
              <h4>Total gained</h4>
              <h1>$80,428</h1>
              <div className="profit-loss">
                <LossIcon />
                <p style={{ color: "#D32217" }}>24%</p>
              </div>
            </div>
            <div className="graph">
              {dummyGraph?.map((list, index) => (
                <div key={index}>
                  <MiniChart labels={list.labels} values={list.values} />
                </div>
              ))}
            </div>
          </div>
          <div className="cards">
            <div className="info">
              <h4>Total value</h4>
              <h1>$105,428</h1>
              <div className="profit-loss">
                <ProfitIcon />
                <p>3.2%</p>
              </div>
            </div>
            <div className="graph">
              {miniGraph?.map((list, index) => (
                <div key={index}>
                  <MiniChart labels={list.labels} values={list.values} />
                </div>
              ))}
            </div>
          </div>
        </DashboardCardsBox>

        <div className="chart-box">
          <Heading>
            <h1>Revenue</h1>
            <span>
              <h2>•</h2> Gained($)
            </span>
          </Heading>
          {dummyGraph?.map((list, index) => (
            <div key={index}>
              <AreaChart labels={list.labels} values={list.values} />
            </div>
          ))}
        </div>

        <BusinessContent>
          <div className="tableWrapper">
            <h2>Business</h2>
            <table>
              <thead>
                <th>Jobs</th>
                <th>Avg. Ticket</th>
                <th>Estimated Rev</th>
                <th>Closed (%)</th>
              </thead>

              <tbody>
                <tr>
                  <td>Install</td>
                  <td>80</td>
                  <td>$5,269</td>
                  <td>90%</td>
                </tr>

                <tr>
                  <td>Install</td>
                  <td>80</td>
                  <td>$5,269</td>
                  <td>90%</td>
                </tr>

                <tr>
                  <td>Install</td>
                  <td>80</td>
                  <td>$5,269</td>
                  <td>90%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="BusinessCards">
            <div className="card">
              <img src={TotalJobs} alt="" />
              <p>Total jobs</p>
              <h1>$2,040</h1>
            </div>

            <div className="card">
              <img src={HoursSaved} alt="" />
              <p>Hours Saved</p>
              <h1>40%</h1>
            </div>

            <div className="card">
              <img src={Totalestimates} alt="" />
              <p>Total estimates</p>
              <h1>$2,040</h1>
            </div>

            <div className="card">
              <img src={EstimatedClosed} alt="" />
              <p>Estimated Closed</p>
              <h1>89</h1>
            </div>
          </div>
        </BusinessContent>
      </div>
    </DashboardWrapper>
  );
}

export const dummyGraph = [
  {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    values: ["10", "20", "30", "25", "20", "20", "25"]
  }
];

const miniGraph = [
  {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    values: ["5", "15", "10", "20", "15", "30", "20", "25"]
  }
];

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #101010;

  span {
    display: flex;
    align-items: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #4b5563;
    gap: 8px;

    h2 {
      color: #101010;
    }
  }
  .dot {
    background: #101010;
  }
`;
