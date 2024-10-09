import { auth } from "@/lib/firebaseAdmin";
/**
* A function to verify Firebase Authentication ID tokens.
* This function is designed to be used as an API endpoint in a Node.js server.
* It expects a POST request with a Firebase ID token in the Authorization header.
* If the token is valid, it returns a JSON response with a success message and the decoded token's UID.
* If the token is invalid or the request method is not POST, it returns an appropriate HTTP response.
*
* @param {import('express').Request} req - The incoming request object.
* @param {import('express').Response} res - The response object to send.
*
* @returns {void}
*/
export default async function handler(req, res) {
  if (req.method === "POST") {
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);

      res
        .status(200)
        .json({ message: "Token verified", uid: decodedToken.uid });
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

