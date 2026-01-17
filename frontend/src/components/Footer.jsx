import React from 'react';
import { Palette, Github, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 pt-20 pb-10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <Palette className="w-8 h-8 text-accent" />
                            <span className="text-2xl title-font font-bold tracking-wider uppercase">RSKIAA</span>
                        </Link>
                        <p className="text-neutral-500 mb-6">
                            Bringing the world's most exquisite contemporary art to your doorstep. Each piece is authenticated and hand-selected.
                        </p>
                        <div className="flex space-x-4">
                            <Instagram className="w-5 h-5 text-neutral-400 hover:text-accent cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-neutral-400 hover:text-accent cursor-pointer transition-colors" />
                            <Github className="w-5 h-5 text-neutral-400 hover:text-accent cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-accent">Gallery</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><Link to="/gallery?category=abstract" className="hover:text-white transition-colors">Abstract</Link></li>
                            <li><Link to="/gallery?category=portrait" className="hover:text-white transition-colors">Portrait</Link></li>
                            <li><Link to="/gallery?category=landscape" className="hover:text-white transition-colors">Landscape</Link></li>
                            <li><Link to="/gallery?category=still-life" className="hover:text-white transition-colors">Still Life</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-accent">Policies</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-accent">Newsletter</h4>
                        <p className="text-neutral-500 mb-4">Subscribe for early access to new collections.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/5 border border-white/10 rounded-l-full px-4 py-2 w-full focus:outline-none focus:border-accent transition-colors"
                            />
                            <button className="bg-accent text-neutral-900 rounded-r-full px-6 py-2 font-bold hover:bg-accent/90 transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 text-center text-neutral-600 text-sm">
                    © 2026 RSKIAA Gallery Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
