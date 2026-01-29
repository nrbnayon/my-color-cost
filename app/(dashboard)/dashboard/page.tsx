import DashboardHeader from "@/components/Shared/DashboardHeader";
import { StatsCard } from "@/components/Shared/StatsCard";
import { statsData } from "@/data/statsData";
import SalesDetailsChart from "@/components/Dashboard/SalesDetailsChart";
import OrderDetailsTable from "@/components/Dashboard/OrderDetailsTable";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Retailer Dashboard" />
      
      <div className="p-4 md:p-8 flex flex-col gap-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((data, index) => (
              <StatsCard key={index} {...data} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Sales Chart */}
            <SalesDetailsChart />

            {/* Table */}
            <OrderDetailsTable title="Order Details" />
          </div>
      </div>
    </div>
  );
}