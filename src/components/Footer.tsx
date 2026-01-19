const Footer = () => {
  return (
    <footer className="mt-12">
      {/* Main Footer */}
      <div className="bg-[#1a1a1a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div>
              <h3 className="text-xl font-bold leading-tight">
                CommRadar<br />
                Competitive<br />
                Intelligence<sup className="text-xs">®</sup>
              </h3>
            </div>

            {/* Cyprus Office */}
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wide">CYPRUS</h4>
              <a 
                href="mailto:alerts@commradar.com" 
                className="text-[#E8FF3C] hover:underline text-sm block mb-2"
              >
                alerts@commradar.com
              </a>
              <p className="text-sm text-gray-300 mb-1">+357 25 103933</p>
              <p className="text-sm text-gray-300 mb-1">10 Panteli Katelari Str,</p>
              <p className="text-sm text-gray-300 mb-1">2nd Floor,</p>
              <p className="text-sm text-gray-300 mb-4">3014 Limassol</p>
              <a 
                href="https://maps.google.com/?q=10+Panteli+Katelari+Str+Limassol+Cyprus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#E8FF3C] hover:underline text-sm uppercase tracking-wide"
              >
                See on map ↗
              </a>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wide">SERVICES</h4>
              <nav className="space-y-2">
                <a href="https://adex.adatacy.com/login" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-[#E8FF3C] transition-colors">
                  Advertising Expenditure Portal
                </a>
                <a href="https://cymaps-dashboard.adatacy.com/login" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-[#E8FF3C] transition-colors">
                  Outdoor Planner
                </a>
                <a href="https://digitalmonitorcy.com/login" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-[#E8FF3C] transition-colors">
                  Digital Monitor
                </a>
                <a href="https://commradar-newadverts.lovable.app/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-[#E8FF3C] transition-colors">
                  New Adverts Portal
                </a>
                <a href="https://commradar-outdoor.lovable.app/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-[#E8FF3C] transition-colors">
                  Outdoor Advertising Portal
                </a>
                <a href="https://www.commradar.com/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-300 hover:text-[#E8FF3C] transition-colors">
                  Social Media Listening
                </a>
              </nav>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wide text-gray-400">
                WANT TO STAY<br />INFORMED?
              </h4>
              <a 
                href="mailto:alerts@commradar.com?subject=Newsletter%20Signup" 
                className="text-[#E8FF3C] hover:underline text-sm uppercase tracking-wide mb-6 block"
              >
                Contact us →
              </a>
              
              <p className="text-sm text-gray-400 mb-3">FOLLOW US</p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/company/commradar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
