import React from 'react';
import CategoryList from '../../components/product/CategoryList';
import BannerProduct from '../../components/product/BannerProduct';
import HorizontalCardVariant from '../../components/product/HorizontalCard';
import HorizontalCardComponent from '../../components/product/HorizontalCardComponent';

const Home = () => {
  return (
    <div className="bg-[#EBF4F6] min-h-screen">
      <CategoryList />
      <BannerProduct />
      <HorizontalCardVariant category="airpodes" heading="Wireless AirPods" />
      <HorizontalCardVariant category="earphones" heading="Bluetooth Earphones" />
      <HorizontalCardComponent category="camera" heading="Digital Camera" />
      <HorizontalCardComponent category="mobiles" heading="Smart Mobiles" />
      <HorizontalCardComponent category="mouse" heading="Gaming Mouse" />
      <HorizontalCardComponent category="printers" heading="Laser Printers" />
      <HorizontalCardComponent category="processor" heading="Intel Processor" />
      <HorizontalCardComponent category="refrigerator" heading="Double Refrigerator" />
      <HorizontalCardComponent category="speakers" heading="Portable Speakers" />
      <HorizontalCardComponent category="trimmers" heading="Beard Trimmers" />
      <HorizontalCardComponent category="televisions" heading="LED Televisions" />
      <HorizontalCardComponent category="watches" heading="Smart Watches" />
    </div>
  );
};

export default Home;