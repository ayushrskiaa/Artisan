import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
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
                            <FileText className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold title-font">Terms & Conditions</h1>
                            <p className="text-neutral-400 text-sm mt-1">Last updated: January 16, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-neutral-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using RSKIAA Gallery website, you accept and agree to be bound by the terms and
                                provisions of this agreement. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Website</h2>
                            <p className="mb-3">You agree to use our website only for lawful purposes. You must not:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Use the website in any way that violates applicable laws or regulations</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Transmit any harmful or malicious code</li>
                                <li>Engage in any activity that interferes with the website's functionality</li>
                                <li>Impersonate any person or entity</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Product Information</h2>
                            <p>
                                We strive to provide accurate product descriptions and images. However, we do not warrant that
                                product descriptions, colors, or other content are accurate, complete, or error-free. All artwork
                                is original and handcrafted, so slight variations may occur.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Pricing and Payment</h2>
                            <p className="mb-3">
                                All prices are listed in Indian Rupees (INR) and are subject to change without notice. We accept payments through:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Razorpay (Credit/Debit Cards, UPI, Net Banking, Wallets)</li>
                                <li>Cash on Delivery (COD) for eligible orders</li>
                            </ul>
                            <p className="mt-3">
                                Payment must be received before order processing. For COD orders, payment is due upon delivery.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Order Processing</h2>
                            <p className="mb-3">
                                When you place an order, you will receive an email confirmation. This does not constitute acceptance
                                of your order. We reserve the right to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Refuse or cancel any order</li>
                                <li>Limit quantities on any order</li>
                                <li>Reject orders from dealers or resellers</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Shipping and Delivery</h2>
                            <p>
                                We ship to addresses within India. Delivery times are estimates and not guaranteed. We are not
                                responsible for delays caused by shipping carriers or circumstances beyond our control.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Returns and Refunds</h2>
                            <p>
                                Please refer to our Refund Policy for detailed information about returns, exchanges, and refunds.
                                All artwork sales are final unless the item is damaged or defective.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
                            <p>
                                All content on this website, including text, graphics, logos, images, and artwork, is the property
                                of RSKIAA Gallery or its content suppliers and is protected by copyright laws. You may not reproduce,
                                distribute, or create derivative works without our express written permission.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. User Accounts</h2>
                            <p className="mb-3">
                                When you create an account, you are responsible for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                            <p>
                                To the fullest extent permitted by law, RSKIAA Gallery shall not be liable for any indirect,
                                incidental, special, consequential, or punitive damages arising out of your use of our website or services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                            <p>
                                These terms shall be governed by and construed in accordance with the laws of India. Any disputes
                                shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                                posting. Your continued use of the website constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                            <p className="mb-3">For questions about these Terms & Conditions, please contact us:</p>
                            <div className="glass p-4 rounded-xl">
                                <p className="font-bold text-accent">RSKIAA Gallery</p>
                                <p>Email: support@rskiaagallery.com</p>
                                <p>Phone: +91 1234567890</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsConditions;
