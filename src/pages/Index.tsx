
import Header from "@/components/Header";
import OverviewCards from "@/components/OverviewCards";
import ExpenditureBarChart from "@/components/ExpenditureBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import MediaExpenditureTable from "@/components/MediaExpenditureTable";
import TopGainersLosers from "@/components/TopGainersLosers";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <OverviewCards />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <ExpenditureBarChart />
          <CategoryPieChart />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <MediaExpenditureTable />
          <TopGainersLosers />
        </div>
      </main>
      
      <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          Media Spend Voyage Dashboard — Q1 2025 Expenditure Analysis
        </div>
      </footer>
    </div>
  );
};

export default Index;
