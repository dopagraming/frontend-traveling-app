import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get("/auth/requireAuth");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  return <>{user ? children : navigate("/signin")}</>;
};

export default RequireAuth;
