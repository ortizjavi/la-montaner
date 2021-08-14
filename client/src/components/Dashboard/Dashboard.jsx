import DashboardAdmin from "./DashboardAdmin";
import SideBar from "../SideBar/SideBar";
import DataUser from "./DataUser";
import DashTable from "./DashTable";


const Dashboard = () => {

	return (
		<div className="dashboard-container">
			<SideBar/>
			<div>
				<DataUser />
			<main className='dashboard-main'>
				<DashTable/>	

			</main>
			</div>
		</div>
	)
}

export default Dashboard;