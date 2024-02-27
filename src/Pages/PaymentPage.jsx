import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Razorpay from "razorpay";

const Payment = ({ total }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: "YOUR_RAZORPAY_API_KEY",
          amount: total * 100, // Amount should be in paise
          currency: "INR",
          name: "Game Store",
          description: "Game Purchase",
          order_id: Math.floor(Math.random() * 1000000),
          handler: function (response) {
            axios
              .post("/api/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
              .then((res) => {
                if (res.data.status === "success") {
                  history.push("/success");
                } else {
                  setError("Payment failed");
                }
              })
              .catch((err) => {
                setError("Payment failed");
              });
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new Razorpay(options);
        razor.open();
      };
      document.body.appendChild(script);
    };

    if (!window.Razorpay) {
      loadScript();
    }
  }, [total]);

  return (
    <div className="mt-4 w-full border border-darkHover p-2 font-heading text-xl font-bold text-darkHover duration-300 hover:bg-darkHover hover:text-darkBg2">
      {loading ? (
        "Processing..."
      ) : (
        <button onClick={() => setLoading(true)}>Pay {total}</button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Payment;