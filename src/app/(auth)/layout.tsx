import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="dark:bg-dark-3 p-10 rounded-md w-[23rem] mt-11 mx-auto">
      {children}
    </div>
  );
};

export default AuthLayout;
