import { api } from "./api";

export async function createPaymentIntent(bookingId) {
  try {
    const response = await api.post(`/payment/create-intent/${bookingId}`);
    return response.data.clientSecret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}
