import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import ResourceList from "./components/Resources/ResourceList";
import ResourceDetails from "./components/Resources/ResourceDetails";
import ResourceForm from "./components/Resources/ResourceForm";

//services
import * as resourceService from "./services/resourceService";

import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [resources, setResources] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddResource = async (resourceFormData) => {
    console.log("resourceFormData in App", resourceFormData);
    const newResource = await resourceService.create(resourceFormData);
    setResources([newResource, ...resources]);

    navigate("/resources");
  };

  const handleDeleteResource = async (resourceId) => {
    const deletedResource = await resourceService.deleteResource(resourceId);
    setResources(resources.filter((r) => r.id !== deletedResource.id));
    navigate("/resources");
  };

  const handleUpdateResource = async (resourceId, resourceFormData) => {
    const updatedResource = await resourceService.update(
      resourceId,
      resourceFormData
    );
    setResources(
      resources.map((r) => (resourceId === r.id ? updatedResource : r))
    );
    navigate(`/resources/${resourceId}`);
  };

  useEffect(() => {
    const fetchAllResources = async () => {
      const resourcesData = await resourceService.index();
      console.log("resourcesData:", resourcesData);
      setResources(resourcesData);
    };
    if (user) fetchAllResources();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard resources={resources} /> : <Landing />}
        />
        {user ? (
          <>
            {/* Protected routes available only to signed-in users */}
            <Route
              path="/resources"
              element={<ResourceList resources={resources} />}
            />
            <Route
              path="/resources/:resourceId"
              element={
                <ResourceDetails handleDeleteResource={handleDeleteResource} />
              }
            />
            <Route
              path="/resources/new"
              element={<ResourceForm handleAddResource={handleAddResource} />}
            />
            <Route
              path="/resources/:resourceId/edit"
              element={
                <ResourceForm handleUpdateResource={handleUpdateResource} />
              }
            />
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
