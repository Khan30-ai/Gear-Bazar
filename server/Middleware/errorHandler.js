
// export default errorHandler;
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  switch (statusCode) {
    case 400:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 404:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};
export default errorHandler;
