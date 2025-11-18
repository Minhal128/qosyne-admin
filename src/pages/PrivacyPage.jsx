import React from 'react';
import Navbar from '../components/Navbar';

const PrivacyPage = () => {
    return (
        <div className="bg-[#010080] text-white">

            <Navbar />


            <div className='px-4 sm:px-6 lg:px-8 mt-10 pb-10'>
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Privacy Policy for Qosyne Technologies</h1>
                <p className="text-sm sm:text-base mb-8">Effective Date: 7/1/2025</p>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">1. Introduction</h2>
                    <p className="text-base sm:text-lg leading-relaxed">At Qosyne Technologies (“we,” “us,” or “our”), we value your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use Qosyne (the “Service”).</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">2. Information We Collect</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">We may collect the following types of information:</p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed ml-4 space-y-1">
                        <li><span className="font-semibold">Personal Information:</span> Name, email address, phone number, date of birth, government-issued ID.</li>
                        <li><span className="font-semibold">Financial Information:</span> Bank account details, credit/debit card information.</li>
                        <li><span className="font-semibold">Device Information:</span> IP address, browser type, device ID, operating system, geolocation.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">3. How We Use Your Information</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">We use your data to:</p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed ml-4 space-y-1">
                        <li>Create and manage your account</li>
                        <li>Process transactions</li>
                        <li>Provide customer support</li>
                        <li>Ensure security and fraud prevention</li>
                        <li>Improve our services and user experience</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">4. Sharing of Information</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">We do not sell your personal data. However, we may share it with:</p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed ml-4 space-y-1">
                        <li>Payment processors and financial institutions</li>
                        <li>Regulatory and law enforcement agencies, as required by law</li>
                        <li>Service providers (e.g., hosting, analytics, KYC/AML compliance)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">5. Data Security</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">We implement industry-standard security measures, including:</p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed ml-4 space-y-1">
                        <li>Encryption (in transit and at rest)</li>
                        <li>Two-factor authentication (2FA)</li>
                        <li>Regular audits and vulnerability assessments</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">6. Your Rights</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">Depending on your location, you may have rights such as:</p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed ml-4 space-y-1">
                        <li>Accessing the personal data we hold about you</li>
                        <li>Requesting correction or deletion of your data</li>
                        <li>Objecting to or restricting processing</li>
                        <li>Data portability</li>
                    </ul>
                    <p className="text-base sm:text-lg leading-relaxed mt-4">To exercise your rights, contact us at: <a href="mailto:admin@qosyne.com" className="text-blue-500 hover:underline">admin@qosyne.com</a></p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">7. Data Retention</h2>
                    <p className="text-base sm:text-lg leading-relaxed">We retain your personal data as long as your account is active or as needed to comply with legal obligations.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">8. Cookies and Tracking Technologies</h2>
                    <p className="text-base sm:text-lg leading-relaxed">We may use cookies and similar technologies to enhance your experience, analyze usage, and customize content.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">9. International Data Transfers</h2>
                    <p className="text-base sm:text-lg leading-relaxed">If your data is transferred outside your country, we ensure adequate safeguards are in place (e.g., standard contractual clauses).</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">10. Changes to This Policy</h2>
                    <p className="text-base sm:text-lg leading-relaxed">We may update this Privacy Policy periodically. Changes will be posted here and take effect upon publication.</p>
                </section>

                <section>
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">11. Contact Us</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">If you have questions or concerns, please contact us at:</p>
                    <address className="not-italic text-base sm:text-lg leading-relaxed">
                        <p>Qosyne Technologies</p>
                        <p>1309 Crampton Place, Brunswick MD</p>
                        <p><a href="mailto:admin@qosyne.com" className="text-blue-500 hover:underline">Admin@qosyne.com</a></p>
                        <p>7132919033</p>
                    </address>
                </section>

            </div>

        </div>
    );
};

export default PrivacyPage;
