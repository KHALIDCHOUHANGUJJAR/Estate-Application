/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [istoken, setToken] = useState(token);
  const handlelogOut = () => {
    localStorage.removeItem("token");
    toast.success("logout successfuly");
    navigate("/SingIn");
  };
  useEffect(() => {
    if (!istoken) {
      navigate("/SingIn");
    }
  });
  return (
    <div>
      Dashboard
      <br />
      <button onClick={handlelogOut}>logout</button>
    </div>
  );
}

export default Dashboard;
