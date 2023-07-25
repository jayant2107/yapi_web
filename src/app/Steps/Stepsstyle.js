import styled from "styled-components";

export const Stepsection=styled.div`
width: 60%;
background-color: white;
text-align: center;
padding:20px;

`;


export const Heading=styled.div`
.stepstage {
    font-size: 14px;
    font-weight: 700;
  }
  .heading {
    color:#3D3D3D;
    font-size:36px;
    margin-top:26px;
  }
  .lighttext{
    color:#B8B8B8;
    font-size:20px;
    line-height:27px;
    padding:5px 0px;
  }



`;
 export const Answers=styled.div`
 display:flex;
 justify-content:center;
 align-items:center;
 margin-top:50px;
 .field{
    width:450px;
 }
 .team{
    display:flex;
    justify-content:space-between;
 }
 .company{
    font-size:14px;
    color:#3D3D3D;
 }
 .number{
    font-size:14px;
    color:#B8B8B8;

 }
 .input-field{
    width:100%;
    padding:12px;
    font-size:16px;
    border:1px solid #F5F5F5;
    color:#B8B8B8;
    margin:5px 0px;

    &:focus{
        outline:none;
    }

 }
 .check{
    display:flex;
    gap:10px;
    margin:20px  0px;
    p{
        color:#8F8F8F;
    }
 }
 .btns{
    display:flex;
    gap:10px;
    margin:20px 0px;
 }

`;
export const Nextbtn=styled.button`
width:100%;
border-radius:10px;
color:white;
background-color:#3D97F2;
padding:20px;
border:none;

`;
export const Backbtn=styled.button`
width:100%;
border-radius:10px;
color:black;
background-color:#F5F5F5;
padding:20px;
border:none;

`;
export const Invitebtn=styled.button`
width:100%;
border-radius:10px;
color:#3D97F2;
background-color:#ECF5FE;
padding:20px;
border:none;

`;