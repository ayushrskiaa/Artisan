const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Painting = require('./models/Painting');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const adminUser = {
    name: 'Admin Artist',
    email: 'admin@artisan.com',
    password: 'password123',
    isAdmin: true
};

const paintings = [
    {
        title: 'Midnight Serenity',
        description: 'A deep, moody exploration of the quiet hours, featuring obsidian tones and ethereal light.',
        artist: 'Alexander Thorne',
        price: 4500,
        imageUrl: 'https://images.unsplash.com/photo-1507502707541-f369a3b18502?q=80&w=800&auto=format&fit=crop',
        category: 'Abstract',
        isFeatured: true
    },
    {
        title: 'Crimson Whisper',
        description: 'An exploration of deep emotional resonance through bold red strokes and subtle textures.',
        artist: 'Elena Rossi',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
        category: 'Abstract',
        isFeatured: true
    },
    {
        title: 'The Gilded Path',
        description: 'A serene journey through a sun-drenched forest path, capturing the essence of golden hour.',
        artist: 'Marcus Vance',
        price: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop',
        category: 'Landscape',
        isFeatured: true
    },
    {
        title: 'Fragments of Time',
        description: 'A contemporary take on the passing of moments, using geometric shapes and vibrant colors.',
        artist: 'Sarah Jenkins',
        price: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop',
        category: 'Contemporary',
        isFeatured: true
    },
    {
        title: 'Azure Dream',
        description: 'A calming abstract piece inspired by the depths of the ocean and open skies.',
        artist: 'Dimitri Volkov',
        price: 1950,
        imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
        category: 'Abstract',
        isFeatured: true
    },
    {
        title: 'Golden Hour',
        description: 'A minimalist landscape focused on the warmth of the setting sun.',
        artist: 'Elena Rossi',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
        category: 'Landscape',
        isFeatured: false
    },
    {
        title: 'Silent Night',
        description: 'A still life composition that evokes peace and quiet contemplation.',
        artist: 'Marcus Vance',
        price: 4200,
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop',
        category: 'Still Life',
        isFeatured: false
    }
];

const seedDB = async () => {
    try {
        await Painting.deleteMany({});
        await User.deleteMany({});
        
        await User.create(adminUser);
        await Painting.insertMany(paintings);
        
        console.log('Database Seeded Successfully with Admin User');
        process.exit();
    } catch (error) {
        console.error('Error Seeding Database:', error);
        process.exit(1);
    }
};

seedDB();
