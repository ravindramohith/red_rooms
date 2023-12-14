import catchAsync from "./catchAsync";
import ErrorHandler from "../utils/errorController";
import { getSession } from "next-auth/client";

export const Authorization = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session)
    return next(
      new ErrorHandler(
        "Your session has expired. Please Login again to get access.",
        401
      )
    );
  req.user = session.user;
  next();
});

export const authorizeRules = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `You are not authorized to access this resource with role(${req.user.role}).`,
          403
        )
      );
    }
    next();
  };
};
