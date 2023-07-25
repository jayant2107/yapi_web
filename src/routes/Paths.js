import CheckMail from "../app/Auth/Forget/CheckMail";
import ForgetPassword from "../app/Auth/Forget/ForgetPassword";
import SetNewPassword from "../app/Auth/Forget/SetNewPassword";
import SignInWithEmail from "../app/Auth/signIn/SignInWithEmail";
import { ConnectServiceTitan } from "../app/Auth/signUp/ConnectServiceTitan";
import { ConnectSlack } from "../app/Auth/signUp/ConnectSlack";
import { SelectLenders } from "../app/Auth/signUp/SelectLenders";
import AcceptInvitation from "../app/Workspace/AcceptInvitation";
import { Congratulations } from "../components/Congratulations";

export const Paths = [
  {
    path: "/",
    component: <SignInWithEmail />
  },
  {
    path: "/sign-in-email",
    component: <SignInWithEmail />
  },
  {
    path: "/forget-password",
    component: <ForgetPassword />
  },
  {
    path: "/check-mail",
    component: <CheckMail />
  },
  {
    path: "/connect-servicetitan",
    component: <ConnectServiceTitan />
  },
  {
    path: "/set-new-password",
    component: <SetNewPassword />
  },
  {
    path: "/connect-slack",
    component: <ConnectSlack />
  },
  {
    path: "/select-lenders",
    component: <SelectLenders />
  },
  {
    path: "/congratulation",
    component: <Congratulations />
  },

  {
    path: "/accept-invitation",
    component: <AcceptInvitation />
  },



];
