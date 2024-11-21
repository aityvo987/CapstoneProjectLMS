"use client";
import React, { FC, useEffect, useState } from "react";
// import toast from "react-hot-toast";

type Props = {
};
const Footer: FC<Props> = (props: Props) => {


    return (
        <div className="w-[90%] 800px:w-[80%] m-auto">
            <footer className="dark:bg-black dark:text-white text-black py-8">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

                    {/* About Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">About</h2>
                        <ul>
                            <li><a href="#our-story" className="hover:underline">Our Story</a></li>
                            <li><a href="#privacy-policy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#faq" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <ul>
                            <li><a href="#courses" className="hover:underline">Courses</a></li>
                            <li><a href="#my-account" className="hover:underline">My Account</a></li>
                            <li><a href="#course-dashboard" className="hover:underline">Course Dashboard</a></li>
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Social Links</h2>
                        <ul>
                            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
                            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Contact Info</h2>
                        <ul>
                            <li>Call Us: +84 94 3911 681</li>
                            <li>Address: 1 Vo Van Ngan Street, Thu Duc District, Ho Chi Minh City</li>
                            <li>Email: <a href="mailto:phantancuong2002@gmail.com" className="hover:underline">phantancuong2002@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Footer;
