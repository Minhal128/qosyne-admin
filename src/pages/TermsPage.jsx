import React from 'react';
import Navbar from '../components/Navbar';

const TermsPage = () => {
    return (
        <div className="bg-[#010080] text-white">

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 mt-10 pb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold  mb-6">Terms and Conditions for Qosyne</h1>
                <p className="text-base sm:text-lg leading-relaxed mb-8">
                    Welcome to Qosyne, a peer-to-peer payment service operated by Fivecom Properties LLC (“we,” “us,” or “our”).
                    These Terms and Conditions (“Terms”) govern your use of our mobile application, website, and related services
                    (collectively, the “Service”). By creating an account or using our Service, you agree to be bound by these Terms.
                </p>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">1. Eligibility</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        You must be at least 14 years old and reside in a jurisdiction where the Service is legally permitted.
                        By using the Service, you represent that you meet these eligibility requirements.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">2. Account Registration</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        You must create an account by providing accurate and current information. You are responsible for
                        maintaining the confidentiality of your account credentials and for all activities under your account.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">3. Use of the Service</h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-2">
                        The Service allows you to send and receive funds from other users. You agree not to use the Service for:
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed ml-4 space-y-1">
                        <li>Illegal activities</li>
                        <li>Fraudulent transactions</li>
                        <li>Transactions exceeding legal or regulatory limits</li>
                    </ul>
                    <p className="text-base sm:text-lg leading-relaxed mt-2">
                        We may monitor activity and report suspicious transactions to appropriate authorities.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">4. Fees</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        Fees may apply for certain transactions or services. Fee schedules will be disclosed within the app.
                        You agree to pay any applicable fees and authorize us to deduct them from your linked account or transactions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">5. Funding and Withdrawal</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        You may link a bank account, debit card, or other accepted payment method to fund or withdraw from your Qosyne balance.
                        We are not responsible for delays or errors caused by third-party financial institutions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">6. Transaction Limits</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        We may set limits on transaction amounts, frequency, or velocity. These limits may change based on risk,
                        regulatory compliance, or account history.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">7. Disputes and Chargebacks</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        All users are responsible for verifying transaction details before confirming. We are not liable for mistaken
                        or unauthorized transactions unless due to our negligence. Chargebacks are subject to investigation and may
                        result in account suspension.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">8. Security</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        We use encryption and other safeguards to protect your information. However, you are responsible for keeping
                        your device and login details secure. Notify us immediately of any suspected unauthorized use.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">9. Suspension and Termination</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        We may suspend or terminate your access to the Service for violations of these Terms, suspected fraud,
                        or legal/regulatory requirements. You may close your account at any time.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">10. Limitation of Liability</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        To the maximum extent permitted by law, Fivecom Properties LLC shall not be liable for indirect, incidental,
                        or consequential damages related to your use of the Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">11. Indemnification</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        You agree to indemnify and hold us harmless from any losses, claims, or expenses arising out of your use of
                        the Service or violation of these Terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">12. Amendments</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        We may modify these Terms at any time. We will notify you of material changes. Continued use of the Service
                        after changes means you accept the updated Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl sm:text-2xl font-bold  mb-4">13. Governing Law</h2>
                    <p className="text-base sm:text-lg leading-relaxed">
                        These Terms are governed by the laws of applicable Jurisdiction. Any disputes shall be resolved in the courts
                        located in your jurisdiction.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;
