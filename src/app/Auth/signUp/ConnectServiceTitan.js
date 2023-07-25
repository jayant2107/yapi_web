import React, { useEffect, useState } from "react";
import { AppLogo, ConnectServiceLogo } from "../../../utils/Images/Images";
import { PublicButton } from "../../../components/PublicButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import InputField from "../../../validation/inputField";
import * as yup from "yup";
import { InfoIcon } from "../../../utils/Icons/SvgIcons";
import {
  createWorkspace,
  getWorkspaceListing,
  updateProfileStatus
} from "../../../services/Collections";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SignInStep } from "../signIn/SignInSlice";
import axios from "axios";

export const ConnectServiceTitan = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state?.LoginSlice?.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [options, setOptions] = useState([]);
  console.log(options);

  console.log(userDetails, "userDetails");

  const initialValues = {
    companyName: "",
    clientid: "",
    clientsecret: "",
    tenantid: "",
    appkey: ""
  };

  const validationSchema = yup.object().shape({
    companyName: yup.string().required("Company Name is required"),
    clientid: yup.string().required("Client ID is required"),
    clientsecret: yup.string().required("Client Secret is required"),
    tenantid: yup.string().required("Tenant ID is required"),
    appkey: yup.string().required("App Key is required")
  });

  const handleCreateWorkspace = async (values) => {
    let reqPayload = {
      workSpaceName: values?.companyName
    };
    let res = await createWorkspace(reqPayload);
    if (res.status === 200) {
      let payload = {
        clientsecret: values?.clientsecret,
        tenantid: Number(values?.tenantid),
        appkey: values?.appkey,
        client_id: values?.clientid,
        workspaceid: res?.data?.companies?.[0]?._id,
        workspacename: res?.data?.companies?.[0]?.workSpaceName,
      };
      handleConnect(payload);
    } else {
      message.error(res?.data?.status || "Something went wrong", 10);
      setLoading(false);
    }
  };

  const handleConnect = async (values) => {
    console.log(values, "values");

    setLoading(true);
    let reqPayload = {
      client_secret: values?.clientsecret,
      userid: userDetails?._id,
      tenantid: Number(values?.tenantid),
      app_key: values?.appkey,
      client_id: values?.client_id,
      username: "admin",
      usertype: "admin",
      workspacename: values?.workspacename,
      app_type: "cxc",
      workspaceid: values?.workspaceid
    };
    const username = "adlevapis";
    const password = "mw8OHBjzN856XrikRDeX19W028s7cvEo";
    const btoaToken = btoa(`${username}:${password}`);
    const token = "Basic " + btoaToken;
    let res = await axios.post(
      "https://gkp16r6ztc.execute-api.us-west-2.amazonaws.com/prod/newclient",
      
      reqPayload,
      { headers: { Authorization: token } }
    );
    console.log(res, "res");
    if (res?.data?.statusCode === 200 || res?.message == "OK") {
      handleSubmit(values?.workspaceid, Number(values?.tenantid), true);
    } else {
      handleSubmit(values?.workspaceid, Number(values?.tenantid), false);
      message.error(res?.data?.status || "Something went wrong", 10);
      setLoading(false);
    }
  };

  const handleSubmit = async (id, tenantId, status) => {
    setLoading(true);
    let obj = {
      tenantId: tenantId,
      workSpaceId: id,
      connectionStatus: status
    };
    let res = await updateProfileStatus(obj);
    if (res?.status === 200) {
      message.success(res?.message);
      let obj = {...userDetails, ...res?.data};
      dispatch(SignInStep(obj));
      setLoading(false);
      navigate("/connect-slack");
    } else {
      setLoading(false);
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };

  const handleWorkspaceListing = async () => {
    let res = await getWorkspaceListing();
    if (res?.status === 200) {
      console.log(res?.data);
      let arr = [];
      res?.data?.length > 0 &&
        res?.data?.map((ele) => {
          let obj = {
            name: ele?.workSpaceName,
            value: ele?.workSpaceName,
            id: ele?._id
          };
          arr.push(obj);
        });

      setOptions(arr);
    } else {
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    handleWorkspaceListing();
  }, []);

  const FormikFieldValues = [
    {
      label: "Company Name",
      name: "companyName",
      type: "text",
      placeholder: "Enter company name",
      component: InputField
    },
    {
      label: "Client ID",
      name: "clientid",
      type: "text",
      placeholder: "Enter client ID",
      component: InputField
    },
    {
      label: "Client Secret",
      name: "clientsecret",
      type: "text",
      placeholder: "Enter client secret",
      component: InputField
    },

    {
      label: "Tenant ID",
      name: "tenantid",
      type: "text",
      placeholder: "Enter tenant ID",
      component: InputField
    },

    {
      label: "App Key",
      name: "appkey",
      type: "text",
      placeholder: "Enter app Key",
      component: InputField
    }
  ];

  return (
    <ConnectServiceTitanWrapper>
      <section>
        <img src={AppLogo} />

        <div className="stepsWrapper">
          <div className="img-box">
            <img src={ConnectServiceLogo} alt="" />
          </div>
          <div className="step-name">
            <h4>Step 01:</h4>
            <p>Connect Service Titan</p>
          </div>
        </div>
        <div className="three-line-box">
          <div className="black"></div>
          <div className="gray"></div>
          <div className="gray"></div>
        </div>
        <div>
          <header>Setup</header>
          <subheader>Set up to create & visit your dashboard</subheader>
          <div className="inner-Section">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCreateWorkspace}
              render={() => (
                <Form>
                  {/* <label>Company Name</label>
                  <Select
                    style={{
                      width: "100%",
                      margin: 0
                    }}
                    className="workspace-select"
                    placeholder="Select company name"
                    value={values?.manager && values?.manager}
                    onChange={(_, data) => setFieldValue("workspace", data)}
                    options={options}
                  /> */}
                  {FormikFieldValues &&
                    FormikFieldValues?.map((field) => (
                      <div key={field?.name} className="gapRow">
                        <label>{field?.label}</label>
                        <Field
                          name={field?.name}
                          type={field?.type}
                          placeholder={field?.placeholder}
                          component={field?.component}
                        />
                      </div>
                    ))}

                  <div className="info-wrapper">
                    <InfoIcon className="info-icon" />
                    <p>How to acquire App key</p>
                  </div>

                  <div className="btn-wrapper">
                    <PublicButton textcard={"Next"} isLoading={loading} />
                  </div>
                </Form>
              )}></Formik>
          </div>
        </div>
      </section>
    </ConnectServiceTitanWrapper>
  );
};

const ConnectServiceTitanWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #101010;
    border-radius: 10px;
  }

  section {
    width: 500px;
    height: 100%;
    padding: 30px 0;
    @media (max-width: 1440px) {
      width: 75%;
    }
    @media (min-width: 480px) and (max-width: 834px) {
      margin-top: 47px;
      padding: 0px !important;
      margin-bottom: 30px;
    }
    @media (min-width: 320px) and (max-width: 480px) {
      width: 87%;
      margin-top: 51px;
      margin-bottom: 30px;
      padding: 0px !important;
    }

    img {
      width: 98px;
      height: 48px;
      margin-bottom: 84px;

      @media (max-height: 850px) {
        margin-bottom: 50px;
      }
      @media (min-width: 480px) and (max-width: 834px) {
        margin-bottom: 28px;
      }
    }

    .stepsWrapper {
      display: flex;
      gap: 15px;
      align-items: center;

      .img-box {
        img {
          width: 48px;
          height: 48px;
          margin-bottom: 0px;

          @media (max-height: 850px) {
            margin-bottom: 0px;
          }
        }
      }

      .step-name {
        h4 {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #101010;
        }

        p {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #4b5563;
        }
      }
    }
    .three-line-box {
      display: flex;
      gap: 8px;
      padding: 14px 0;

      .black {
        width: 160px;
        border-bottom: 3px solid #000000;
      }
      .gray {
        width: 160px;
        border-bottom: 3px solid #d9e0e7;
      }
    }

    header {
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 40px;
      color: #101010;
      margin: 12px 0 8px 0px;
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

      .workspace-select {
        .ant-select-selection-placeholder {
          width: 100%;
          background: rgb(255, 255, 255);
          border-radius: 8px;
          border-style: none;
          font-family: Inter, sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 30px;
          color: #4b5563e6;
          padding: 0 5px;
        }
      }
      .gapRow {
        margin-top: 16px;
        input {
          margin: 5px 0 !important;
        }
      }
      .info-wrapper {
        margin: 12px 0 34px 0;
      }

      @media (min-width: 480px) and (max-width: 834px) {
        margin-bottom: 0px;
      }

      .two-in-one {
        display: flex;
        gap: 16px;
        div {
          label {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #101010;
          }
          input {
            margin-top: 4px;
          }
        }
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
        margin: 32px 0px 30px 0px;
      }
    }
  }
`;
