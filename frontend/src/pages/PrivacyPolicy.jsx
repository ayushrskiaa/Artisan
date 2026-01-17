import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-950 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl p-8 md:p-12"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-accent/10 rounded-full">
                            <Shield className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold title-font">Privacy Policy</h1>
                            <p className="text-neutral-400 text-sm mt-1">Last updated: January 16, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-neutral-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <p className="mb-3">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Name and contact information (email address, phone number)</li>
                                <li>Shipping and billing addresses</li>
                                <li>Payment information (processed securely through Razorpay)</li>
                                <li>Purchase history and preferences</li>
                                <li>Communication preferences</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <p className="mb-3">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and updates</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Improve our website and services</li>
                                <li>Send promotional communications (with your consent)</li>
                                <li>Prevent fraud and enhance security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Payment Security</h2>
                            <p>
                                All payment transactions are processed through Razorpay, a PCI-DSS compliant payment gateway.
                                We do not store your complete credit card information on our servers. Razorpay uses industry-standard
                                encryption to protect your payment information during transmission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
                            <p className="mb-3">We do not sell or rent your personal information to third parties. We may share your information with:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Payment processors (Razorpay) to process transactions</li>
                                <li>Shipping partners to deliver your orders</li>
                                <li>Service providers who assist in operating our website</li>
                                <li>Law enforcement when required by law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information
                                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                                over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                            <p>
                                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic,
                                and understand where our visitors are coming from. You can control cookies through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                            <p className="mb-3">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
                            <p>
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect
                                personal information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                                the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                            <p className="mb-3">If you have any questions about this Privacy Policy, please contact us at:</p>
                            <div className="glass p-4 rounded-xl">
                                <p className="font-bold text-accent">Rskiaa Gallery</p>
                                <p>Email: ashutoshrskiaa@gmail.com</p>
                                <p>Phone: +91 9507515702</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
