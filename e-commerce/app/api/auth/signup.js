/**
* This function handles the sign out process for a user in an e-commerce application.
* It is an API endpoint that accepts POST requests.
*
* @param {import('express').Request} req - The request object containing the HTTP request details.
* @param {import('express').Response} res - The response object used to send a response back to the client.
*
* @returns {void}
*/
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      res.status(201).json({ user: userCredential.user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

