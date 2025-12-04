const Footer = () => {
  return (
    <footer className="bg-[#2a2a2a] text-white py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">COMPANY</h3>
            <p className="mb-4">CommRadar Competitive Intelligence</p>
            
            <div className="mb-4">
              <p>Address:</p>
              <p>10 Panteli Katelari Str,</p>
              <p>2nd Floor,</p>
              <p>3014 Limassol.</p>
            </div>
            
            <p className="mb-6">Tel. +357 25 103933</p>
            
            <nav className="space-y-2">
              <a href="https://commradar.com/faq" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">FAQ</a>
              <a href="https://commradar.com/careers" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">Careers</a>
              <a href="https://commradar.com/google-ads-monitoring" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">Google Ads Monitoring</a>
              <a href="https://commradar.com/news" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">News Blog</a>
              <a href="https://commradar.com/about" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">About CommRadar</a>
            </nav>
          </div>
          
          {/* Portals Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 tracking-wide">PORTALS</h3>
            <nav className="space-y-2">
              <a href="https://commradar.com/advertising-expenditure" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">Advertising Expenditure Portal</a>
              <a href="https://commradar.com/competition-admonitor" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">Competition admonitor</a>
              <a href="https://commradar.com/outdoor-planner" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">Outdoor Planner</a>
              <a href="https://commradar.com/digital-monitor" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-300 transition-colors">Digital Monitor</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
