import { useContext } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
// Import the Landing and Dashboard components
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import ResourceList from "./components/Resources/ResourceList";

import { UserContext } from "./contexts/UserContext";
const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes available only to signed-in users */}
            <Route path="/resources" element={<ResourceList />} />
          </>
        ) : (
          <>
            {/* Non-user routes for guests */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
