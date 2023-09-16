import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const withLogin =
  (WrappedComponent: any) =>
    // eslint-disable-next-line react/display-name
    ({ ...props }) => {
      const [hasAuthorized, setAuthorized] = useState(true);

      useEffect(() => {
        const userId = localStorage.getItem("SOLY_USER_ID");
        isLoggedInLocal(userId!);
      }, []);

      const isLoggedInLocal = (userId?: string) => {
        if (userId) {
          setAuthorized(true);
          // if (userRole === "organizer") {
          //   window.location.href = "/org/dashboard";
          // } else {
          window.location.href = "/";
          // }
        } else {
          setAuthorized(false);
        }
      };

      return <>{!hasAuthorized && <WrappedComponent {...props} />}</>;
    };

export { withLogin };
