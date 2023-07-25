import styled from "styled-components";

export const DashboardWrapper = styled.div`
  width: 100%;
  height: 100%;

  .chart-box {
    background-color: #ffff;
    box-shadow: 0px 2px 12px rgba(16, 24, 40, 0.06);
    border-radius: 8px;
    margin-top: 24px;
    padding: 16px;
  }

  .content {
    width: 100%;
    padding: 16px;
  }
`;

export const DashboardCardsBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 834px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .cards {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    gap: 10px;
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(16, 24, 40, 0.06);
    border-radius: 8px;

    @media (max-width: 750px) {
      padding: 10px;
    }

    .info {
      h4 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #101010;
      }
      h1 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        color: #101010;
        margin-top: 8px;
      }
      .profit-loss {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 16px;
        p {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #027a48;
        }
      }
    }
    .graph {
      width: 150px;
      height: 55px;

      canvas {
        height: 55px !important;
      }
    }
  }
`;

export const DashboardGraphBox = styled.div`
  width: 100%;
  height: 100%;
  ${"" /* background-color: #ffff; */}
  box-shadow: 0px 2px 12px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  margin-top: 24px;
  opacity: 0.5;
`;

export const BusinessContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;

  .tableWrapper {
    width: 62%;
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(16, 24, 40, 0.06);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #101010;
    }
    table {
      margin-top: 16px;
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f9fafb;

      th {
        padding: 11px;
      }
    }

    td {
      text-align: center;
      height: 52px;
      border-bottom: 1px solid #e5e7eb;
    }
  }

  .BusinessCards {
    width: 37%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .card {
      height: 128px;
      padding: 16px;
      background: #ffffff;
      box-shadow: 0px 2px 12px rgba(16, 24, 40, 0.06);
      border-radius: 8px;

      img {
        width: 32px;
        height: 32px;
      }
      p {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #4b5563;
        margin-top: 12px;
      }
      h1 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #101010;
        margin-top: 4px;
      }
    }
  }

  @media (max-width: 834px) {
    flex-direction: column;

    .tableWrapper {
      width: 100%;

      ${
        "" /* th {
        font-family: "Inter" !important;
        font-style: normal !important;
        font-weight: 500 !important;
        font-size: 12px !important;
        line-height: 16px !important;
        white-space: nowrap;
      } */
      }
      ${
        "" /* td {
        font-family: "Inter" !important;
        font-style: normal !important;
        font-weight: 500 !important;
        font-size: 12px !important;
        line-height: 16px !important;
        color: #101010 !important;
      } */
      }
    }
    .BusinessCards {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    flex-direction: column;

    .tableWrapper {
      width: 100%;

      th {
        font-family: "Inter" !important;
        font-style: normal !important;
        font-weight: 500 !important;
        font-size: 12px !important;
        line-height: 16px !important;
        white-space: nowrap;
      }
      td {
        font-family: "Inter" !important;
        font-style: normal !important;
        font-weight: 500 !important;
        font-size: 12px !important;
        line-height: 16px !important;
        color: #101010 !important;
      }
    }
    .BusinessCards {
      width: 100%;
    }
  }
`;
