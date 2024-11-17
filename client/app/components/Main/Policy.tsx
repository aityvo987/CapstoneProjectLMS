import { styles } from '@/app/styles/styles';
import React from 'react';

const Policy = () => {
    return (
        <div className="container mx-auto py-6 text-gray-800">
            <div className="text-center">
                <h1 className={`${styles.title} pb-4 text-3xl sm:text-4xl md:text-5xl text-[#37a39a]`}>
                    Platform Terms and Conditions
                </h1>
            </div>
            <div className="max-w-4xl mx-auto text-black dark:text-white">
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl text-[#37a39a]">Privacy Policy</h2>
                    <p className="mt-2 text-lg font-Poppins leading-8">
                        Your privacy is important to us. This Privacy Policy explains how your personal information is collected, used, and disclosed by our website.
                    </p>
                    <p className="mt-2 text-lg font-Poppins leading-8">
                        We may collect personal information such as your name, email address, and browsing activity. This information is used to improve our services and provide you with a better user experience.
                    </p>
                    <p className="mt-2 text-lg font-Poppins leading-8">
                        By using our website, you agree to the collection and use of information in accordance with this Privacy Policy.
                    </p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl text-[#37a39a]">Terms of Service</h2>
                    <p className="mt-2 text-lg font-Poppins leading-8">
                        By accessing or using our website, you agree to comply with these Terms of Service. Please read these terms carefully before using our website.
                    </p>
                    <p className="mt-2 text-lg font-Poppins leading-8">
                        Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content or privacy practices of these websites.
                    </p>
                    <p className="mt-2 text-lg font-Poppins leading-8">
                        We reserve the right to modify or terminate the service at any time without notice. We also reserve the right to update these Terms of Service at any time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Policy;