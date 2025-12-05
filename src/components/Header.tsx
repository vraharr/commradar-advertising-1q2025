import commradarLogo from "@/assets/commradar-logo.jpg";
const Header = () => {
  return <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://www.commradar.com" target="_blank" rel="noopener noreferrer">
            <img src={commradarLogo} alt="CommRadar Logo" className="h-12 w-auto" />
          </a>
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <a href="https://www.commradar.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">commradar.com</a>
            <a href="https://www.commradar.com/googleads-monitoring" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Google Ads
            </a>
            <a href="https://www.commradar.com/medianews" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Media News
            </a>
            <a href="https://www.commradar.com/services" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Our Services
            </a>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;