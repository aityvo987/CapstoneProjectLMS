import { styles } from "@/app/styles/styles";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateCartOrderMutation, useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
  setIsSuccess?:any;
};

const CheckOutForm = ({ setOpen, data, user, setIsSuccess }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [route, setRoute] = useState("Login");
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error:orderError,isSuccess:orderSuccess }] = useCreateOrderMutation();
  const [createCartOrder, { data: orderCartData, error: cartError,isSuccess:cartSuccess }] = useCreateCartOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);

    } 
    else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      if (Array.isArray(data.courseIds)) {
        createCartOrder({ courseIds: data.courseIds, payment_info: paymentIntent });
      } else {
        createOrder({ courseId: data.courseIds, payment_info: paymentIntent });
      }
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);

      const orderedCourses = Array.isArray(data.courseIds) ? data.courseIds.join(", ") : data.courseIds;

      socketId.emit("notification", {
        title: "New Order",
        message: `You have new order(s): ${orderedCourses}`,
        userId: user._id,
      });
      
    }

    if (orderError) {
      if ("data" in orderError) {
        const errorMessage = orderError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (cartError) {
      if ("data" in cartError) {
        const errorMessage = cartError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (cartSuccess || orderSuccess){
      setIsSuccess(true);
    }
  }, [orderData, orderError,orderCartData,cartError,cartSuccess,orderSuccess]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
