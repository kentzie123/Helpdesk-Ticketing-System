import "./Dashboard.css";

// Components
import DashboardStatusCards from "../../Components/DashboardStatusCards/DashboardStatusCards";
import DashboardCharts from "../../Components/DashboardCharts/DashboardCharts";
import DashboardRecentTicketAndActivity from "../../Components/DashboardRecentTicketAndActivity/DashboardRecentTicketAndActivity";

const Dashboard = () => {


  return (
    <div className="p-2">
      <div className="d-flex flex-column gap-3">
        <h4>Dashboard</h4>

        <DashboardStatusCards />
        <DashboardCharts />
        <DashboardRecentTicketAndActivity />

        
      </div>
    </div>
  );
};

export default Dashboard;
