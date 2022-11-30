import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const ProtectedRoutes = ({ children }) => {
	const { coverLetter } = useGlobalContext();
	console.log(coverLetter);
	if (!coverLetter) {
		return <Navigate to="/" />;
	}
	return children;
};

export default ProtectedRoutes;
