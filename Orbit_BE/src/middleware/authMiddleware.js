import jwt from "jsonwebtoken";

export const userAuthMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Autharised Email Again!",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDecode);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorised User Again! 1",
      });
    }

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: {
        "Message :": "Not Authorised Email Again! 2",
        Error: error.message,
      },
    });
  }
};
