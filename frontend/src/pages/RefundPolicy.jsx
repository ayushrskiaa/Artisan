import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
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
                            <RotateCcw className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold title-font">Cancellations & Refunds Policy</h1>
                            <p className="text-neutral-400 text-sm mt-1">Last updated: January 16, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-neutral-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Order Cancellation</h2>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-accent">1.1 Before Shipment</h3>
                                <p>
                                    You can cancel your order before it has been shipped. To cancel an order, please contact us
                                    immediately at support@rskiaagallery.com or call +91 1234567890. Once cancelled, a full refund
                                    will be processed within 5-7 business days.
                                </p>

                                <h3 className="text-lg font-bold text-accent mt-4">1.2 After Shipment</h3>
                                <p>
                                    Orders cannot be cancelled once they have been shipped. However, you may return the item as per
                                    our return policy (see section 2).
                                </p>

                                <h3 className="text-lg font-bold text-accent mt-4">1.3 Cash on Delivery (COD) Orders</h3>
                                <p>
                                    COD orders can be cancelled anytime before delivery. Simply refuse to accept the delivery, and
                                    no charges will apply.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Return Policy</h2>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-accent">2.1 Eligibility for Returns</h3>
                                <p className="mb-3">You may return an item within <strong className="text-white">7 days</strong> of delivery if:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>The item is damaged or defective</li>
                                    <li>The wrong item was delivered</li>
                                    <li>The item does not match the description</li>
                                </ul>

                                <h3 className="text-lg font-bold text-accent mt-4">2.2 Non-Returnable Items</h3>
                                <p className="mb-3">The following items cannot be returned:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Custom or personalized artwork</li>
                                    <li>Items damaged due to misuse or negligence</li>
                                    <li>Items without original packaging</li>
                                </ul>

                                <h3 className="text-lg font-bold text-accent mt-4">2.3 Return Process</h3>
                                <p className="mb-3">To initiate a return:</p>
                                <ol className="list-decimal list-inside space-y-2 ml-4">
                                    <li>Contact us at support@rskiaagallery.com with your order number and reason for return</li>
                                    <li>Send clear photos of the damaged/defective item</li>
                                    <li>Wait for our return authorization and instructions</li>
                                    <li>Pack the item securely in its original packaging</li>
                                    <li>Ship the item to our return address (provided in authorization email)</li>
                                </ol>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Refund Policy</h2>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-accent">3.1 Refund Processing Time</h3>
                                <p>
                                    Once we receive and inspect your returned item, we will process your refund within
                                    <strong className="text-white"> 5-7 business days</strong>. You will receive an email confirmation
                                    when the refund has been processed.
                                </p>

                                <h3 className="text-lg font-bold text-accent mt-4">3.2 Refund Method</h3>
                                <p className="mb-3">Refunds will be issued to the original payment method:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong className="text-white">Razorpay Payments:</strong> Refunded to the original card/UPI/wallet within 5-7 business days</li>
                                    <li><strong className="text-white">Cash on Delivery:</strong> Refunded via bank transfer (please provide bank details)</li>
                                </ul>

                                <h3 className="text-lg font-bold text-accent mt-4">3.3 Partial Refunds</h3>
                                <p className="mb-3">Partial refunds may be granted in cases where:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Item shows signs of use or damage not caused by us</li>
                                    <li>Item is returned without original packaging</li>
                                    <li>Item is returned after the 7-day return window</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Exchanges</h2>
                            <p>
                                We currently do not offer direct exchanges. If you wish to exchange an item, please return it for
                                a refund and place a new order for the desired item.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Damaged or Defective Items</h2>
                            <p className="mb-3">
                                If you receive a damaged or defective item:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li>Contact us within 48 hours of delivery</li>
                                <li>Provide photos of the damage/defect</li>
                                <li>We will arrange for a replacement or full refund</li>
                                <li>Return shipping costs will be covered by us</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Return Shipping Costs</h2>
                            <div className="space-y-3">
                                <p className="mb-3">Shipping costs for returns depend on the reason:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong className="text-white">Our Error:</strong> We cover all return shipping costs</li>
                                    <li><strong className="text-white">Change of Mind:</strong> Customer is responsible for return shipping costs</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Refund Status</h2>
                            <p>
                                You can check your refund status by contacting us at support@rskiaagallery.com with your order number.
                                Please note that it may take additional time for your bank or payment provider to process the refund.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                            <p className="mb-3">For any questions about cancellations, returns, or refunds:</p>
                            <div className="glass p-4 rounded-xl">
                                <p className="font-bold text-accent">RSKIAA Gallery</p>
                                <p>Email: support@rskiaagallery.com</p>
                                <p>Phone: +91 1234567890</p>
                                <p>Hours: Monday - Saturday, 10:00 AM - 6:00 PM IST</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RefundPolicy;
