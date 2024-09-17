"use client";
import { useEffect, useState, useCallback } from "react";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../../redux/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUsers, filterUsers } from "../../redux/userSlice";
import { getAuth } from "../actions";
import LoadingScreen from "../../components/LoadingScreen";
import { useRouter } from "next/navigation";
import Card from "../../components/Card";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth);
  const { filteredUsers, status, error } = useSelector(
    (state: RootState) => state.users
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [visibleEmailIds, setVisibleEmailIds] = useState<Set<number>>(
    new Set()
  );

  const fetchAuthStatus = useCallback(async () => {
    try {
      const status = await getAuth();
      dispatch(setAuthStatus(status));
    } catch (error) {
      console.error("Error fetching auth status", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!authStatus.isAuthenticated) {
      fetchAuthStatus();
    } else {
      setLoading(false);
    }
  }, [authStatus.isAuthenticated, fetchAuthStatus]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(filterUsers());
    }
  }, [status, dispatch]);

  const toggleEmailVisibility = (id: number) => {
    setVisibleEmailIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading || status === "loading") {
    return <LoadingScreen />;
  }
  if (status === "failed") {
    return (
      <Modal
        open={true}
        onClose={() => console.log("MODAL Error")}
        title="Error"
        content={error}
      />
    );
  }

  if (!authStatus.isAuthenticated) {
    return (
      <Modal
        open={true}
        onClose={() => router.push("/")}
        title="Error"
        content="You need to log in to access this page."
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Filtered Users</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            id={user.id}
            firstName={user.first_name}
            lastName={user.last_name}
            email={user.email}
            avatar={user.avatar}
            isEmailVisible={visibleEmailIds.has(user.id)}
            onClick={() => toggleEmailVisibility(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
