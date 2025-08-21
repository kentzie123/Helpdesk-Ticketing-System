import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Media Query
import { useMediaQuery } from "react-responsive";

// Stores
import { useDashboardStore } from "../../store/useDashboardStore";

// Hooks
import { useEffect } from "react";

const DashboardCharts = () => {
  const isMobile = useMediaQuery({ maxWidth: 1300 });
  const {
    ticketStatusCounts,
    ticketPriorityCounts,
    ticketCategoryCounts,
    getTicketStatusCounts,
    getTicketPriorityCounts,
    getTicketCategoryCounts,
  } = useDashboardStore();

  const STATUS_COLORS = {
    Open: "#0088FE",
    "In Progress": "#FFBB28",
    Resolved: "#00C49F",
    Closed: "#FF8042",
  };
  const PRIORITY_COLORS = {
    Low: "#28a745",
    Medium: "#ffc107",
    High: "#fd7e14",
    Urgent: "#dc3545",
  };
  const CATEGORY_COLORS = {
  "Technical Issue": "#007bff",
  "Account Access": "#6f42c1",
  "Hardware Request": "#28a745",
  "Software Installation": "#17a2b8",
  "Network Problem": "#fd7e14",
  "Maintenance Request": "#ffc107",
  "Other": "#6c757d",
};


  useEffect(() => {
    getTicketStatusCounts();
    getTicketPriorityCounts();
    getTicketCategoryCounts();
  }, []);

  useEffect(()=>{
    console.log(ticketCategoryCounts);
    
  },[ticketCategoryCounts])

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {/* Tickets by Status (Pie Chart) */}
      <div className="col">
        <div className="p-4 border shadow-sm rounded-3 h-100">
          <h5 className="mb-3">Tickets by Status</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={ticketStatusCounts}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={100}
                  label
                >
                  {ticketStatusCounts?.map((entry, index) => (
                    <Cell key={index} fill={STATUS_COLORS[entry.status]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align={isMobile ? "center" : "right"}
                  wrapperStyle={{ right: isMobile ? "0" : "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tickets by Priority (Bar Chart) */}
      <div className="col">
        <div className="p-4 border shadow-sm rounded-3 h-100">
          <h5 className="mb-3">Tickets by Priority</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={ticketPriorityCounts}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar dataKey="count">
                  {ticketPriorityCounts?.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PRIORITY_COLORS[entry.priority] || "#8884d8"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tickets by Category (Pie Chart) */}
      <div className="col">
        <div className="p-4 border shadow-sm rounded-3 h-100">
          <h5 className="mb-3">Tickets by Status</h5>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={ticketCategoryCounts}
                  dataKey="count"
                  nameKey="category"
                  outerRadius={100}
                  label
                >
                  {ticketCategoryCounts?.map((entry, index) => (
                    <Cell key={index} fill={CATEGORY_COLORS[entry.category]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align={isMobile ? "center" : "right"}
                  wrapperStyle={{ right: isMobile ? "0" : "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
