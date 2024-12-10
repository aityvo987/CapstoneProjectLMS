import React, { useEffect, useState } from 'react';
import './Cart.css';
import { redirect } from "next/navigation";
import Image from 'next/image';
import { styles } from '@/app/styles/styles';
import toast from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { IoCloseOutline } from 'react-icons/io5';
import CheckOutForm from '../../Payment/CheckOutForm';
import { useClearUserCartMutation, useCreatePaymentIntentMutation, useDeleteFromCartMutation, useDeleteFromUserCartMutation, useGetStripePublishablekeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from "@stripe/stripe-js";


interface CartProps {
  cart: any;
  setCart: any;
  deleteFromCart: any;
  user: any;
  setRoute: any;
  setOpen: any;
}

const Cart: React.FC<CartProps> = ({ cart, setCart,
  deleteFromCart, user,
  setRoute, setOpen: openAuthModal }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState({ courseIds: [] });
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [clearUserCart, { isSuccess: clearSuccess, error: clearError }] = useClearUserCartMutation({});
const [deleteFromCartCom, { isSuccess: deleteCartSuccess, error: deleteCartError }] = user === undefined
    ? useDeleteFromCartMutation({})
    : useDeleteFromUserCartMutation({});

  useEffect(() => {
    if (cart !== null) {
      const newTotalPrice = cart.reduce((total: any, item: any) => total + item.price, 0);
      setTotalPrice(newTotalPrice);
      const courseIds = cart.map((item: any) => item.courseId);
      setData({ courseIds: courseIds });
      if (config) {
        const publishablekey = config?.publishableKey;
        setStripePromise(loadStripe(publishablekey));
      }

      if (data) {
        const amount = Math.round(newTotalPrice * 100);
        createPaymentIntent(amount);
      }
    }

  }, [cart]);
    useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
    if (isSuccess){
      console.log("Clearing1",user._id)
      clearCart(user._id);
      setIsSuccess(false)
      toast.success("Your order has been successfully. Return to homepage");
      redirect("/");
    }
    if (clearError) {
      if ("data" in clearError) {
        const errorMessage = clearError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [paymentIntentData,isSuccess,deleteCartError,clearSuccess,clearError]);

  const removeFromCart = async (index: number) => {
    await deleteFromCart(cart[index].courseId);
  };

  const clearCart = async(id:string)=>{
    console.log("Clearing2",user._id)
    await clearUserCart(id);
  };

  const handleCheckout = () => {
    redirect('/checkout');
  };
  const handleOrder = (e: any) => {
    // console.log('ggg');
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };
  return (
    <div className="cart-container ">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[#37a39a]">
          <h1 className="text-lg font-bold text-white">Shopping Cart</h1>
          <span className="text-white">({cart.length} items)</span>
        </div>
        <div className="p-4">
          {cart.map((item: any, index: number) => (
            <div key={index} className="flex items-center mb-4">
              <img className="h-16 w-16 object-contain rounded-lg mr-4" src={item.thumbnail.url} alt="Product" />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-black">{item.name}</h2>
                <span className="text-gray-600">${item.price}</span>
              </div>
              <button className="text-gray-600 hover:text-red-500" onClick={() => removeFromCart(index)}>
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-[#37a39a]">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-white">Total:</span>
            <span className="font-bold text-lg text-white">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="block w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleOrder}>
            Checkout
          </button>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="rounded-xl w-[500px] min-h-[500px] bg-white shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                ></IoCloseOutline>
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user} setIsSuccess={setIsSuccess}></CheckOutForm>
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;