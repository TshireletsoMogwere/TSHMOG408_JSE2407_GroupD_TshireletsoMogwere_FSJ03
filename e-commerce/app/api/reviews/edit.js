import { getAuth } from "firebase-admin/auth";
import { db } from "../../../lib/firebase";

/**
* Handles PUT requests to update a review in the database.
*
* @param {Request} req - The incoming request object.
* @param {Response} res - The response object to send back to the client.
*
* @returns {Response} - Returns a response object with a status code and JSON payload.
*
* @throws Will throw an error if the request method is not PUT.
*
* @example
* PUT /api/reviews/edit
* {
*   "reviewId": "12345",
*   "productId": "67890",
*   "rating": 4,
*   "comment": "Great product!"
* }
*/
export default async function GET(req, res) {
  if (req.method === "PUT") {
    const { reviewId, productId, rating, comment } = req.body;

    try {
      const idToken = req.headers.authorization.split("Bearer ")[1];
      const user = await getAuth().verifyIdToken(idToken);

      const reviewRef = db
        .collection("products")
        .doc(productId)
        .collection("reviews")
        .doc(reviewId);
      await reviewRef.update({ rating, comment });
      return res.status(200).json({ message: "Review updated successfully." });
    } catch (error) {
      return res.status(500).json({ error: "Failed to update review." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

