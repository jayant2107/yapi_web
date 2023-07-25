/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PublicButton } from "./PublicButton";
import { InfoIcon } from "../utils/Icons/SvgIcons";
import { Field, Form, Formik } from "formik";
import { Modal, message } from "antd";
import InputField from "../validation/inputField";
import * as yup from "yup";
import styled from "styled-components";
import PropTypes from "prop-types";
import { updateProfileStatus } from "../services/Collections";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SignInStep } from "../app/Auth/signIn/SignInSlice";

export const ConnectCrmModal = ({ open, handleClose, connectModalData }) => {
  const [loading, setLoading] = useState();
  // const [options, setOptions] = useState([]);
  const userDetails = useSelector((state) => state?.LoginSlice?.data);
  const dispatch = useDispatch();
  console.log("connectModalData", connectModalData);

  const initialValues = {
    workspace: "",
    clientid: "cid.4pnty4dyy7uy7gfnr16unzvf0",
    clientsecret: "cs1.xfaddj4wrd9taqz6h6ur9zr5u9be5qkdwmjj2wecktm0i1fksw",
    tenantid: "383103367",
    appkey: "ak1.xattebstdegwnsu958opm1wla"
  };

  const validationSchema = yup.object().shape({
    clientid: yup.string().required("Client ID is required"),
    clientsecret: yup.string().required("Client Secret is required"),
    tenantid: yup.string().required("Tenant ID is required"),
    appkey: yup.string().required("App Key is required")
  });

  const handleConnect = async (values) => {
    console.log(values, "values");

    setLoading(true);
    let reqPayload = {
      client_secret: values?.clientsecret,
      userid: userDetails?._id,
      tenantid: Number(values?.tenantid),
      app_key: values?.appkey,
      client_id: values?.clientid,
      username: "admin",
      usertype: "admin",
      workspacename: connectModalData?.workSpaceName,
      app_type: "cxc",
      workspaceid: connectModalData?._id
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
      handleSubmit(values?.workspace?.id, Number(values?.tenantid));
    } else {
      message.error(res?.data?.status || "Something went wrong", 10);
      setLoading(false);
    }
  };

  const handleSubmit = async (id, tenantId) => {
    setLoading(true);
    let obj = {
      tenantId: tenantId.toString(),
      workSpaceId: connectModalData?._id,
      connectionStatus: true
    };
    let res = await updateProfileStatus(obj);
    if (res?.status === 200) {
      message.success(res?.message);

      let obj = { ...userDetails, ...res?.data };
      console.log(obj, "objkeccccccccccccccccc");
      dispatch(SignInStep(obj));
      setLoading(false);
      handleClose();
      // navigate("/connect-slack");
    } else {
      setLoading(false);
      message.error(
        res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
      );
    }
  };

  // const handleWorkspaceListing = async () => {
  //   let res = await getWorkspaceListing();
  //   if (res?.status === 200) {
  //     console.log(res?.data);
  //     let arr = [];
  //     res?.data?.length > 0 &&
  //       res?.data?.map((ele) => {
  //         let obj = {
  //           name: ele?.workSpaceName,
  //           value: ele?.workSpaceName,
  //           id: ele?._id
  //         };
  //         arr.push(obj);
  //       });

  //     setOptions(arr);
  //   } else {
  //     message.error(
  //       res?.response?.data?.message || res?.message || res?.error || "Something went wrong"
  //     );
  //   }
  // };

  // useEffect(() => {
  //   handleWorkspaceListing();
  // }, []);

  const FormikFieldValues = [
    // {
    //   label: "Select Workspace",
    //   name: "workspace",
    //   type: "text",
    //   placeholder: "Select Workspace",
    //   component: InputField
    // },
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
    <Modal
      className="Crm-modal"
      open={open}
      centered
      width={548}
      footer={false}
      onCancel={handleClose}>
      <ModalWrapper>
        <ConnectServiceTitanWrapper>
          <section>
            <div>
              {/* <header>Add new CRM</header> */}
              <subheader>Add new CRM for {connectModalData?.workSpaceName}</subheader>
              <div className="inner-Section">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleConnect}
                  render={() => (
                    <Form>
                      {/* <label>Select Workspace</label>
                      <Select
                        style={{
                          width: "100%",
                          margin: 0
                        }}
                        className="workspace-select"
                        placeholder="Please company name"
                        value={values?.manager && values?.manager}
                        // suffixIcon={null}
                        onChange={(_, data) => setFieldValue("workspace", data)}
                        //   onChange={handleChange}
                        tokenSeparators={[","]}
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
      </ModalWrapper>
    </Modal>
  );
};

ConnectCrmModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  connectModalData: PropTypes.object
};

const ModalWrapper = styled.div`
  width: 100%;
  padding: 0 5px;
`;

const ConnectServiceTitanWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-right: 5px;
  justify-content: center;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-height: 850px) {
    height: 92vh;
  }
  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #fff;
  }
  ::-webkit-scrollbar-thumb {
    background: #cecece;
    border-radius: 10px;
  }

  section {
    width: 100%;
    height: 100%;
    padding: 30px 0;

    img {
      width: 98px;
      height: 48px;
      margin-bottom: 84px;
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
      font-weight: 600;
      font-size: 26px;
      line-height: 24px;
      color: #101010;
    }

    .inner-Section {
      display: flex;
      flex-direction: column;
      margin: 30px 0;

      .gapRow {
        margin-top: 16px;
      }
      .info-wrapper {
        margin: 12px 0 34px 0;
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
