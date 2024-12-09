"use client";
import { useGetUserCourseDetailQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetail from "./CourseDetail";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";

import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailPage = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useGetUserCourseDetailQuery({ id });
  const [changedCartItems,setChangedCartItems]= useState(false);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }

    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  // console.log(data)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + " ELearning"}
            description={
              "ELearning is a programming community which is developed by Dat Cuong for helping programmers"
            }
            keywords={data?.course?.tags}
          ></Heading>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
            changedCartItems={changedCartItems}
            setChangedCartItems={setChangedCartItems}
          />
          {stripePromise && (
            <CourseDetail
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={(route: string) => {
                /* logic chuyển hướng hoặc cập nhật route */
              }}
              setOpen={setOpen}
              setChangedCartItems={setChangedCartItems}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};
export default CourseDetailPage;
