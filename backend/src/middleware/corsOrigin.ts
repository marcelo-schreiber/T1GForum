export default function corsOrigin(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
}
