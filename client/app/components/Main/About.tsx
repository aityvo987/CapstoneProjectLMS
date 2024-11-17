import { styles } from '@/app/styles/styles';
import React from 'react';

const About = () => {
    return (
        <section className="about-section">
            <div className="container text-black dark:text-white">
                <h1 className={`${styles.title} 800px:! text-[45px]`}>
                    What is <span className="text-[#37a39a]">LMS System</span>
                </h1>
                <div className='w-[95%] 800px:w-[85%] m-auto'>
                    <p className='text-[18px] font-Poppins'>
                        <p>
                            Our mission is to bridge the gap between theory and practice in IT education by offering practical, hands-on learning opportunities that prepare students for real-world challenges.
                        </p>
                        <br></br>
                        <h3 className='text-[#37a39a] text-[30px]'>Key Features</h3>
                        <ul className={`${styles.label} 800px:! text-[18px]`}>
                            <li>- Comprehensive IT course catalog covering various domains such as programming, cybersecurity, networking, and more</li>
                            <li>- Interactive learning materials including videos, tutorials, and source code</li>
                            <li>- Engaging discussion forums under a lesson for students to collaborate, ask questions, and share knowledge</li>
                            <li>- Regular assessments and quizzes to track progress and reinforce learning (Comingsoon)</li>
                            <li>- Personalized learning paths tailored to individual student needs and goals</li>
                            <li>- Expert instructors with industry experience to guide and mentor students</li>
                        </ul>
                        <br></br>
                        <h1 className={`${styles.title} 800px:! text-[45px]`}>
                            <span className="text-[#37a39a]">Join Us Today</span>
                        </h1>
                        <br></br>
                        <p>
                            Whether you are an aspiring IT professional, a seasoned developer looking to expand your skills, or an educator passionate about sharing knowledge, our IT LMS is the perfect platform for you. Join us today and embark on a journey of continuous learning and growth in the exciting world of Information Technology.
                        </p>
                    </p>
                    <br></br>
                    <br></br>
                    <div className="text-right mt-5">
                        <span className="font-Cursive text-[22px]">Tien Dat and Tan Cuong-</span>
                        <h5 className="text-[18px] font-Poppins">
                            Founders and CEOs of LearnMaster
                        </h5>
                    </div>
                    <br></br>
                    <br></br>
                </div>

            </div>
        </section>
    );
};

export default About;