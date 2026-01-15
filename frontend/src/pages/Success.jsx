import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Success = () => {
    return (
        <div className="pt-40 pb-20 px-4 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-12 rounded-3xl max-w-lg w-full text-center"
            >
                <div className="flex justify-center mb-8">
                    <div className="p-6 bg-green-500/20 rounded-full animate-bounce">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold title-font mb-4">Masterpiece Secured</h1>
                <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                    Thank you for your purchase. We are preparing your artwork for its safe journey to your doorstep. You will receive an email confirmation shortly.
                </p>
                <div className="flex flex-col gap-4">
                    <Link
                        to="/orders"
                        className="bg-accent text-neutral-900 font-bold py-4 rounded-full hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
                    >
                        View Order Status
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                        Continue Exploring
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
