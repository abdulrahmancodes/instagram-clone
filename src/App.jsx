import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import PrivateRoute from "./helpers/PrivateRoute";
import { getUserByUserId } from "./services/firebase";
import SavedPosts from "./components/profile/savedPosts";
import Loader from "react-loader";
import Navbar from "./components/navbar";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const Suggestions = lazy(() => import("./pages/suggestions-page"));
const CreatePost = lazy(() => import("./pages/create-post"));

function App() {
  const [file, setFile] = useState();
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user, file, setFile }}>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.CREATE_POST} component={CreatePost} />
            <Route path={ROUTES.SUGGESTIONS} component={Suggestions} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
