
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import OverviewCards from "@/components/OverviewCards";
import ExpenditureBarChart from "@/components/ExpenditureBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import MediaExpenditureTable from "@/components/MediaExpenditureTable";
import TopGainersLosers from "@/components/TopGainersLosers";
import TopAdvertisersTable from "@/components/TopAdvertisersTable";
import { fetchMediaExpenditures } from "@/services/mediaExpenditureService";

const Index = () => {
  const { data: mediaExpenditureData, isLoading, error } = useQuery({
    queryKey: ['mediaExpenditures'],
    queryFn: fetchMediaExpenditures,
    meta: {
      onError: () => {
        toast.error("Failed to load expenditure data");
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-2">Loading dashboard data...</p>
              <div className="h-2 w-40 mx-auto bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !mediaExpenditureData) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <p className="text-xl text-red-600 font-medium mb-2">Failed to load data</p>
              <p className="text-gray-600 mb-4">There was a problem loading the expenditure data.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <OverviewCards data={mediaExpenditureData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <ExpenditureBarChart data={mediaExpenditureData} />
          <CategoryPieChart data={mediaExpenditureData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <MediaExpenditureTable data={mediaExpenditureData} />
          <TopGainersLosers data={mediaExpenditureData} />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <TopAdvertisersTable limit={40} />
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
