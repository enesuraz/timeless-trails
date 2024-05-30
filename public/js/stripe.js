const stripe = Stripe(
  "pk_test_51PGkLyRrGUrKgUKb3gNBWstBMDxauNYZrGosYFKQzPMnK9ROSfDhZ27fytSijOnZTernd7TJm5n6hFyS2NmOjR7700Rj267gnP"
);

export async function bookingTour(tourId, el) {
  try {
    const res = await fetch(`/api/v1/bookings/checkout-session/${tourId}`);
    const session = await res.json();

    el.innerHTML = "...Processing";

    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  } catch (err) {
    console.err(err);
    alert(err.message);
  }
}
