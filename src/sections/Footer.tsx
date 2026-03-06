import { Instagram, Facebook, Twitter, Trophy } from 'lucide-react';
import { footerConfig } from '../config';

const Footer = () => {
  return (
    <footer id="footer" className="bg-black border-t-2 border-imperial-yellow/20 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-imperial-yellow flex items-center justify-center bevel-sm">
              <Trophy className="w-5 h-5 text-black" />
            </div>
            <span className="font-aggressive text-xl text-white">{footerConfig.brandName}</span>
          </div>
          <p className="text-white/60 mb-8 max-w-sm">{footerConfig.brandDescription}</p>
          
          {/* Socials */}
          <div>
            <h4 className="font-mono-custom text-imperial-yellow text-xs tracking-[0.2em] uppercase mb-4">{footerConfig.socialTitle}</h4>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-imperial-yellow transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-imperial-yellow transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-imperial-yellow transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-mono-custom text-imperial-yellow text-xs tracking-[0.2em] uppercase mb-6">{footerConfig.quickLinksTitle}</h4>
          <ul className="space-y-3 font-mono-custom text-sm">
            {footerConfig.quickLinks.map((link, index) => (
              <li key={index}>
                <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors uppercase">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-mono-custom text-imperial-yellow text-xs tracking-[0.2em] uppercase mb-6">{footerConfig.contactTitle}</h4>
          <ul className="space-y-4 text-sm text-white/60 font-mono-custom">
            <li>
              <span className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">{footerConfig.emailLabel}</span>
              <a href={`mailto:${footerConfig.email}`} className="hover:text-imperial-yellow transition-colors">{footerConfig.email}</a>
            </li>
            <li>
              <span className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">{footerConfig.phoneLabel}</span>
              <a href={`tel:${footerConfig.phone}`} className="hover:text-imperial-yellow transition-colors">{footerConfig.phone}</a>
            </li>
            <li>
              <span className="block text-white/40 text-[10px] uppercase tracking-wider mb-1">{footerConfig.addressLabel}</span>
              <span className="leading-relaxed">{footerConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-widest">{footerConfig.copyrightText}</p>
        <div className="flex flex-wrap gap-6 justify-center">
          {footerConfig.bottomLinks.map((link, index) => (
            <a key={index} href="#" className="font-mono-custom text-xs text-white/40 hover:text-white transition-colors uppercase tracking-wider">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
