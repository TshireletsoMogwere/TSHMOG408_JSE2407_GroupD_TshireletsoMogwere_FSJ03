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
import { signOut } from "firebase/auth";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await signOut(auth);
      res.status(200).json({ message: "Signed out successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

