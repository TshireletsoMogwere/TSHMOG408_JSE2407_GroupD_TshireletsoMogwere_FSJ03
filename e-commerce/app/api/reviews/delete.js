import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { db } from "../../../lib/firebase";

/**
* Deletes a review from the specified product in the database.//+
*
* @param {Request} req - The incoming request object containing the review ID and product ID in the request body.
* @returns {Response} - A JSON response indicating the success or failure of the deletion operation.
*
* @throws Will throw an error if the review ID or product ID is missing in the request body.
* @throws Will throw an error if the authorization token is missing or invalid.
* @throws Will throw an error if there is an issue deleting the review from the database.
*/
export async function DELETE(req) {
  {/** Parse the request body */}
  const { reviewId, productId } = await req.json();

  try {
    {/**Verify the ID token from the request headers */}
    const idToken = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!idToken) {
      return NextResponse.json(
        { error: "Authorization token missing." },
        { status: 401 }
      );
    }

    const user = await getAuth().verifyIdToken(idToken);

    {/**Reference to the review document to delete */}
    const reviewRef = db
      .collection("products")
      .doc(productId)
      .collection("reviews")
      .doc(reviewId);
    await reviewRef.delete();

    return NextResponse.json(
      { message: "Review deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review." },
      { status: 500 }
    );
  }
}

