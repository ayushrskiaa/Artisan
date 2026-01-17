import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
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
                            <Truck className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold title-font">Shipping Policy</h1>
                            <p className="text-neutral-400 text-sm mt-1">Last updated: January 16, 2026</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-neutral-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Shipping Coverage</h2>
                            <p>
                                We currently ship to all locations within India. International shipping is not available at this time.
                                We partner with reliable courier services to ensure your artwork reaches you safely.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Processing Time</h2>
                            <p className="mb-3">
                                Orders are processed within <strong className="text-white">1-2 business days</strong> (Monday-Saturday,
                                excluding public holidays) after payment confirmation. You will receive a confirmation email once your
                                order has been shipped with tracking information.
                            </p>
                            <div className="glass p-4 rounded-xl mt-3">
                                <p className="text-sm"><strong className="text-accent">Note:</strong> Custom or personalized orders may take 3-5 business days for processing.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Delivery Time</h2>
                            <p className="mb-3">Estimated delivery times vary by location:</p>
                            <div className="space-y-3">
                                <div className="glass p-4 rounded-xl">
                                    <h3 className="font-bold text-accent mb-2">Metro Cities</h3>
                                    <p className="text-sm">Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad</p>
                                    <p className="text-white font-bold mt-2">3-5 business days</p>
                                </div>
                                <div className="glass p-4 rounded-xl">
                                    <h3 className="font-bold text-accent mb-2">Tier 1 & Tier 2 Cities</h3>
                                    <p className="text-sm">Major cities and state capitals</p>
                                    <p className="text-white font-bold mt-2">5-7 business days</p>
                                </div>
                                <div className="glass p-4 rounded-xl">
                                    <h3 className="font-bold text-accent mb-2">Other Locations</h3>
                                    <p className="text-sm">Towns and rural areas</p>
                                    <p className="text-white font-bold mt-2">7-10 business days</p>
                                </div>
                            </div>
                            <p className="mt-3 text-sm">
                                <strong className="text-accent">Note:</strong> These are estimated delivery times and may vary due to
                                unforeseen circumstances such as weather conditions, political situations, or courier delays.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Shipping Charges</h2>
                            <div className="space-y-3">
                                <div className="glass p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold">Orders above ₹5,000</span>
                                        <span className="text-accent font-bold">FREE SHIPPING</span>
                                    </div>
                                    <p className="text-sm text-neutral-400">Enjoy free shipping on all orders above ₹5,000</p>
                                </div>
                                <div className="glass p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold">Orders below ₹5,000</span>
                                        <span className="text-white font-bold">₹150</span>
                                    </div>
                                    <p className="text-sm text-neutral-400">Standard shipping charges apply</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Order Tracking</h2>
                            <p className="mb-3">
                                Once your order is shipped, you will receive:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Shipping confirmation email with tracking number</li>
                                <li>SMS updates on delivery status</li>
                                <li>Courier partner details and contact information</li>
                            </ul>
                            <p className="mt-3">
                                You can track your order using the tracking number on the courier partner's website or contact us
                                for assistance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Packaging</h2>
                            <p>
                                All artwork is carefully packaged to ensure safe delivery. We use:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                                <li>Protective bubble wrap for delicate items</li>
                                <li>Sturdy cardboard boxes with corner protection</li>
                                <li>Waterproof outer covering</li>
                                <li>"Fragile" and "Handle with Care" labels</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Delivery Attempts</h2>
                            <p className="mb-3">
                                Our courier partners will make <strong className="text-white">3 delivery attempts</strong>. If delivery
                                is unsuccessful after 3 attempts, the order will be returned to us. In such cases:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>You will be notified via email and SMS</li>
                                <li>You can arrange for reshipment (shipping charges may apply)</li>
                                <li>Or request a refund as per our refund policy</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">8. Damaged During Shipping</h2>
                            <p className="mb-3">
                                If your order arrives damaged:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li>Do not accept the delivery if the package appears severely damaged</li>
                                <li>If you've already accepted, take photos of the damage immediately</li>
                                <li>Contact us within 48 hours at ashutoshrskiaa@gmail.com</li>
                                <li>We will arrange for a replacement or full refund</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">9. Cash on Delivery (COD)</h2>
                            <p className="mb-3">
                                COD is available for orders up to ₹10,000. Additional COD charges:
                            </p>
                            <div className="glass p-4 rounded-xl">
                                <p className="font-bold text-accent mb-2">COD Handling Fee: ₹50</p>
                                <p className="text-sm">This fee is added to your order total and collected at the time of delivery.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">10. Address Changes</h2>
                            <p>
                                Once an order is placed, the shipping address cannot be changed. Please ensure your address is correct
                                before completing your purchase. If you need to change the address, you must cancel the order (if not
                                yet shipped) and place a new order.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                            <p className="mb-3">For shipping-related queries:</p>
                            <div className="glass p-4 rounded-xl">
                                <p className="font-bold text-accent">RSKIAA Gallery</p>
                                <p>Email: ashutoshrskiaa@gmail.com</p>
                                <p>Phone: +91 9507515702</p>
                                <p>Hours: Monday - Saturday, 10:00 AM - 6:00 PM IST</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
