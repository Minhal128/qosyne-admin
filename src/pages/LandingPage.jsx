import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaMobileAlt, FaShieldAlt, FaExchangeAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import Img from '../assets/landing/mobile.png';
import transaction from '../assets/landing/transaction.png';

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut'
        }
    })
};

const LandingPage = () => {
    return (
        <div className="w-full text-white bg-[#010080]">
            <Navbar />

            <div className='px-4 sm:px-6 lg:px-8 py-10'>

                {/* Hero Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-white pb-20 py-10 flex justify-between items-start flex-wrap"
                >
                    <motion.div variants={fadeInUp}>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Qosyne</h1>
                        <p className="text-lg sm:text-xl max-w-2xl">The easiest way to send, receive, and manage money across platforms—securely and instantly.</p>
                        <div className="mt-4 flex items-center gap-x-3 flex-wrap">
                            <Link to="/" className="mt-2 bg-white text-black py-2 px-6 rounded-full hover:bg-gray-200 transition text-sm">Get it on App Store</Link>
                            <Link to="/" className="mt-2 bg-white text-black py-2 px-6 rounded-full hover:bg-gray-200 transition text-sm">Get it on Play Store</Link>
                        </div>
                    </motion.div>

                    <motion.img src={Img} alt="" className='w-[14rem]' variants={fadeInUp} custom={1.5} />
                </motion.section>

                {/* About Us Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='py-16 flex justify-between items-start flex-wrap'
                >
                    <motion.section variants={fadeInUp}>
                        <h2 className="text-3xl font-bold mb-4">About Qosyne</h2>
                        <p className="max-w-3xl text-lg">Qosyne is a peer-to-peer (P2P) and Business to Consumer (B2C) payment app that enables users to send and receive money directly using a mobile device—even across different platforms.</p>
                    </motion.section>

                    <motion.img src={transaction} alt="" className='w-[14rem]' variants={fadeInUp} custom={1.5} />
                </motion.div>

                {/* Features Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="py-16 text-center"
                >
                    <motion.h2 className="text-3xl font-bold mb-12" variants={fadeInUp}>Why Qosyne?</motion.h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                        {[{
                            icon: <FaExchangeAlt />,
                            title: "Cross-Platform Transfers",
                            desc: "Send and receive money across multiple trusted platforms in real-time."
                        }, {
                            icon: <FaMoneyCheckAlt />,
                            title: "Minimal Fees",
                            desc: "Enjoy ultra-low transfer fees with every transaction."
                        }, {
                            icon: <FaShieldAlt />,
                            title: "Bank-Grade Security",
                            desc: "We protect your data and money with strong encryption and secure protocols."
                        }, {
                            icon: <FaMobileAlt />,
                            title: "Smart Notifications",
                            desc: "Track payments with real-time updates and an easy-to-read transaction history."
                        }].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                custom={index * 0.3}
                                className="bg-blue-800 p-6 shadow-lg rounded-xl"
                            >
                                <div className="text-4xl mb-4 mx-auto">{item.icon}</div>
                                <h3 className="text-xl mb-2">{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="py-16"
                >
                    <motion.h2 className="text-3xl font-bold text-center mb-8" variants={fadeInUp}>Contact Us</motion.h2>
                    <motion.form
                        variants={fadeInUp}
                        className="max-w-3xl mx-auto bg-blue-800 p-8 rounded-xl shadow-md space-y-6"
                    >
                        <div className="flex flex-col">
                            <label htmlFor="name" className="mb-2">Name</label>
                            <input type="text" id="name" className="outline-none rounded-lg p-3" placeholder="Your Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input type="email" id="email" className="outline-none rounded-lg p-3" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="message" className="mb-2">Message</label>
                            <textarea id="message" rows="4" className="rounded-lg p-3" placeholder="How can we help?" />
                        </div>
                        <button onClick={(e) => e.preventDefault()} type="submit" className="w-full text-white py-3 rounded-lg bg-blue-900 transition">Send Message</button>
                    </motion.form>
                </motion.section>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-sm mt-10"
                >
                    © {new Date().getFullYear()} Qosyne. All rights reserved.
                </motion.footer>
            </div>
        </div>
    );
};

export default LandingPage;
