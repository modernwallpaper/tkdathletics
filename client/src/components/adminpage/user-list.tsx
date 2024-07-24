import { useGetAllUsersMutation } from "@/slices/user.api.slice";
import { useEffect } from "react";

export const UserList = () => {
  const [getAllUsers, { data: users, error, isLoading }] =
    useGetAllUsersMutation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getAllUsers({}).unwrap(); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [getAllUsers]);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users</p>;

  return (
    <div>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};
