import { styles } from '@/app/styles/styles';
import React, { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { useRouter } from 'next/router'; // Import useRouter for client-side navigation
import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';

const Redirect = () => {
    const { user } = useSelector((state: any) => state.auth);
    const [logout, setLogout] = useState(false);
    const [countdown, setCountdown] = useState(5); // Initial countdown value
    const { } = useLogOutQuery(undefined, {
        skip: !logout,
    });

    useEffect(() => {
        if (!user) {
            const countdownInterval = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000); // Update countdown every second

            // Clear the countdown interval and redirect after countdown reaches 0
            if (countdown === 0) {
                clearInterval(countdownInterval);
                toast.success("Logout successfully!");
                redirect("/");
            }

            // Clear the countdown interval on component unmount or user logs in
            return () => clearInterval(countdownInterval);
        }

        const handleLogout = async () => {
            signOut();
            setLogout(true);
        };

        if (!logout) {
            handleLogout();
        }
    }, [logout, user, countdown]);

    return (
        <div className="container mx-auto py-6 text-gray-800">
            <div className="text-center">
                <h1 className={`${styles.title} dark:text-white text-black pb-4 text-3xl sm:text-4xl md:text-5xl text-[#37a39a]`}>
                    You are logging out of Admin Pages !!!
                </h1>
                
            </div>
        </div>
    );
};

export default Redirect;