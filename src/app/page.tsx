"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/Login/login";
import LoadingScreen from "../components/LoadingScreen/index";
import { getAuth } from "./actions";
import { setAuthStatus } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const status = await getAuth();
        dispatch(setAuthStatus(status));

        if (status.isAuthenticated) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching auth status", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, [dispatch, router]);

  if (loading) return <LoadingScreen />;

  return authStatus.isAuthenticated ? (
    <div>Redirecting to dashboard...</div>
  ) : (
    <Login />
  );
};

export default LoginPage;
