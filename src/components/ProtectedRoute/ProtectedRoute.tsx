import { Navigate } from "react-router-dom";

 interface IProtectedRouteProps {
    redirectPath: string;
    children: JSX.Element;
    isAllowed: boolean;
}

export const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children,
  }: IProtectedRouteProps) => {


    if (isAllowed) {
       return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };