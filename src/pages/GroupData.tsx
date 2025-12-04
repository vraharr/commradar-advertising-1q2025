import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import GroupSummaryTable from "@/components/GroupSummaryTable";
import GroupDonutCharts from "@/components/GroupDonutCharts";
import Footer from "@/components/Footer";
import { fetchGroupData, getPivotData } from "@/services/groupDataService";

const GroupData = () => {
  const { data: groupData, isLoading, error } = useQuery({
    queryKey: ['groupData'],
    queryFn: fetchGroupData,
    staleTime: 5 * 60 * 1000,
    meta: {
      onError: () => {
        toast.error("Failed to load group data");
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading group data...</p>
        </div>
      </div>
    );
  }

  if (error || !groupData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-600">Failed to load data</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const pivotData = getPivotData(groupData);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Media Group Analysis</h2>
          <p className="text-muted-foreground mt-1">
            Advertising expenditure breakdown by media group and type
          </p>
        </div>

        <div className="grid gap-6">
          <GroupSummaryTable data={pivotData} />
          <GroupDonutCharts data={pivotData} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GroupData;
