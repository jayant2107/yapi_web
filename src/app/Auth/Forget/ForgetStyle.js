import styled from "styled-components";

export const ForgetWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 480px) and (max-width: 834px) {
    align-items: unset;
    height: 100%;
    min-height: 618px !important;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    align-items: unset;
    height: 100%;
    min-height: 513px;
  }

  @media (max-height: 860px) {
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 5px;
      height: 2px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #fff;
    }
    ::-webkit-scrollbar-thumb {
      background: #101010;
      border-radius: 10px;
    }
  }

  @media (max-height: 850px) {
    padding: 20px 0;
  }

  section {
    width: 500px;
    padding: 30px 0;

    @media (max-width: 1440px) {
      width: 75%;
    }
    @media (max-height: 850px) {
      height: 100%;
    }
    @media (min-width: 480px) and (max-width: 834px) {
      padding: 0px !important;
      margin-bottom: 30px;
    }
    @media (min-width: 320px) and (max-width: 480px) {
      width: 87%;
      margin-top: 51px;
      padding: 0px !important;
      margin-bottom: 30px;
    }

    img {
      width: 98px;
      height: 48px;
      margin-bottom: 84px;

      @media (min-width: 480px) and (max-width: 834px) {
        margin-top: 57px;
        margin-bottom: 28px;
      }
      @media (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 27px;
      }
      @media (max-height: 850px) {
        margin-bottom: 27px;
      }
    }

    header {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 40px;
      color: #101010;
      margin: 12px 0;

      @media (min-width: 320px) and (max-width: 480px) {
        margin-top: 0px;
      }
    }

    subheader {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #4b5563;
    }

    .inner-Section {
      display: flex;
      flex-direction: column;
      margin: 30px 0;

      @media (min-width: 480px) and (max-width: 834px) {
        margin-bottom: 0px;
      }
      @media (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 0px;
      }

      label {
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #101010;
        padding: 5px 0;
        margin-bottom: 4px;
        padding-top: 13px;
      }

      input {
        width: 100%;
        height: 52px;
        filter: drop-shadow(0px 2px 12px rgba(16, 24, 40, 0.06));
        background: #ffffff;
        border-radius: 8px;
        border-style: none;
        padding: 14px 16px;
        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #4b5563;
        ${"" /* margin-bottom: 16px; */}

        :focus {
          outline: none;
        }
      }
      .btn-wrapper {
        margin: 37px 0; 

        @media (min-width: 320px) and (max-width: 480px) {
          margin-bottom: 0px;
        }
      }
      .goBackDiv {
        @media (min-width: 320px) and (max-width: 480px) {
          margin-top: 15px;
        }
      }
      .login-with {
        @media (min-width: 320px) and (max-width: 480px) {
          margin-top: 25px;
        }
      }

      .password-requirements {
        p {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          /* identical to box height, or 150% */
          margin: 16px 0;
          color: #101010;
        }
        div {
          display: flex;
          justify-content: space-between;
          ul {
            list-style: none;
            font-family: "Inter";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: -0.01em;
            color: #4b5563;
          }

          ul li:before {
            /* content: "✓"; */
            content: "•";
            margin: 0 5px;
          }
        }
      }
    }
  }
`;

export const PasswordEyeWrapper = styled.div`
  position: absolute;
  right: 14px;
  top: 59px;
  cursor: pointer;
`;
