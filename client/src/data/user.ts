import { RootState } from "@/store";
import { useSelector } from "react-redux";

const { user } = useSelector((state: RootState) => state.auth);
export default user; 
