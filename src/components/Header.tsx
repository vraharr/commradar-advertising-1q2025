
const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/56939c85-63df-4098-b7a9-51da392da262.png" 
              alt="CommRadar Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Advertising Expenditure Cyprus</h1>
              <p className="text-blue-100 text-sm">Q1 2025 vs Q1 2024 Expenditure Analysis</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
              <span className="font-medium">Last Updated:</span> April 11, 2025
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
