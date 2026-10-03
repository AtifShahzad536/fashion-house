import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import CustomizationOption from './models/CustomizationOption.js';
import HeroSlide from './models/HeroSlide.js';
import Coupon from './models/Coupon.js';

import {
  categoriesData,
  heroSlidesData,
  customizerOptionsData,
  sampleProducts,
  couponsData,
} from './data/seedData.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    console.log('🧹 Clearing previous collection data...');
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await CustomizationOption.deleteMany();
    await HeroSlide.deleteMany();
    await Coupon.deleteMany();

    console.log('👑 Seeding Users (Admin & Customer)...');
    const adminUser = await User.create({
      name: 'Fashion House Sialkot Admin',
      email: 'admin@fashionhouse.com',
      password: 'admin12345password',
      role: 'admin',
      phone: '+92 300 1234567',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    });

    const customerUser = await User.create({
      name: 'Ayesha Malik',
      email: 'ayesha@gmail.com',
      password: 'customer123password',
      role: 'customer',
      phone: '+92 321 9876543',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      addresses: [
        {
          fullName: 'Ayesha Malik',
          phone: '+92 321 9876543',
          street: 'House 42-B, Gulberg III',
          city: 'Lahore',
          state: 'Punjab',
          postalCode: '54000',
          country: 'Pakistan',
          isDefault: true,
        },
      ],
      measurementProfiles: [
        {
          profileName: 'Ayesha Bridal Fit',
          bust: 36,
          underBust: 31,
          waist: 30,
          hips: 40,
          shoulder: 14.5,
          armHole: 16,
          sleeveLength: 12,
          lehengaLength: 42,
          choliLength: 15,
          notes: 'Prefer slight ease around the waist for ceremony seating.',
        },
      ],
    });

    console.log('✨ Seeding Categories...');
    const createdCategories = await Category.insertMany(categoriesData);
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    console.log('👗 Seeding Luxury Bridal Products...');
    const productsData = sampleProducts(categoryMap);
    await Product.insertMany(productsData);

    console.log('✂️ Seeding Customization Options...');
    await CustomizationOption.insertMany(customizerOptionsData);

    console.log('🖼️ Seeding Hero Slides (CMS)...');
    await HeroSlide.insertMany(heroSlidesData);

    console.log('🎟️ Seeding Luxury Coupons...');
    await Coupon.insertMany(couponsData);

    console.log('\n========================================');
    console.log('🎉 FASHION HOUSE SIALKOT DATABASE SEEDED SUCCESSFULLY! (22 Products)');
    console.log('========================================');
    console.log('🔑 Admin Credentials:');
    console.log('   Email:    admin@fashionhouse.com');
    console.log('   Password: admin12345password');
    console.log('----------------------------------------');
    console.log('👤 Customer Credentials:');
    console.log('   Email:    ayesha@gmail.com');
    console.log('   Password: customer123password');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeder Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await CustomizationOption.deleteMany();
    await HeroSlide.deleteMany();
    await Coupon.deleteMany();

    console.log('🗑️ Database Cleared!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
