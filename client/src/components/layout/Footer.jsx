import React from 'react';
import { Logo } from './Logo';
export const Footer = () => {
    return (<footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Logo />
            <p className="text-gray-500 text-sm">
              Empowering farmers with direct market access. A B2B/B2C agricultural marketplace eliminating middlemen.
            </p>
            <p className="text-sm font-semibold text-gray-900">
              Built for Smart India Hackathon (SIH) 2026
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Marketplace</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Browse Produce</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Bulk Orders</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Pricing</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Trust & Safety</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
                  <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} AgroConnect. All rights reserved. Prototype for SIH 2026.
          </p>
        </div>
      </div>
    </footer>);
};
