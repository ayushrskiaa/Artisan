import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-950 pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold title-font mb-4">Get In Touch</h1>
                    <p className="text-neutral-400 text-lg">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Your Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="+91 1234567890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-400">Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-accent hover:bg-accent/90 text-neutral-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-accent/50"
                            >
                                <Send className="w-5 h-5" />
                                {submitted ? 'Message Sent!' : 'Send Message'}
                            </button>
                            {submitted && (
                                <p className="text-accent text-center text-sm">Thank you! We'll get back to you soon.</p>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full flex-shrink-0">
                                        <Mail className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Email Us</h3>
                                        <p className="text-neutral-400 text-sm mb-2">For general inquiries and support</p>
                                        <a href="mailto:ashutoshrskiaa@gmail.com" className="text-accent hover:text-accent/80 transition-colors">
                                            ashutoshrskiaa@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full flex-shrink-0">
                                        <Phone className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Call Us</h3>
                                        <p className="text-neutral-400 text-sm mb-2">Monday - Saturday, 10 AM - 6 PM IST</p>
                                        <a href="tel:+919507515702" className="text-accent hover:text-accent/80 transition-colors">
                                            +91 9507515702
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-accent/10 rounded-full flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">Visit Us</h3>
                                        <p className="text-neutral-400 text-sm">
                                            Rskiaa Gallery<br />
                                            SLS Splendor<br />
                                            Belandur, Bangalore<br />
                                            Karnataka, 560103<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                            <div className="space-y-3">
                                <Link to="/shipping-policy" className="block text-accent hover:text-accent/80 transition-colors">
                                    → Shipping Policy
                                </Link>
                                <Link to="/refund-policy" className="block text-accent hover:text-accent/80 transition-colors">
                                    → Refund Policy
                                </Link>
                                <Link to="/terms" className="block text-accent hover:text-accent/80 transition-colors">
                                    → Terms & Conditions
                                </Link>
                                <Link to="/privacy" className="block text-accent hover:text-accent/80 transition-colors">
                                    → Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
