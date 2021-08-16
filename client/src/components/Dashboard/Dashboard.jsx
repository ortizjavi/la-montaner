import DashboardAdmin from "./DashboardAdmin";
import SideBar from "../SideBar/SideBar";
import DataUser from "./DataUser";
import DashTable from "./DashTable";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../redux/actions/types/adminActions";


const Dashboard = () => {

    const dispatch = useDispatch()
    const usuario = useSelector((state) => state.session.user);
    const ordenes = useSelector((state) => state.cart.orders);

    if(!ordenes){
        dispatch(getOrders())
    }
    const respuesta = ordenes?.find(o => o.user === usuario._id);

    console.log('dashboard/respuesta',respuesta)
    console.log('dashboard/ordenes',ordenes)

    return (
        <div className="dashboard-container">
            <SideBar/>
            <div>
                
                <h3>{respuesta?.cart[0].name}</h3>
                <DataUser />
            <main className='dashboard-main'>
                <DashTable/>

            </main>
            </div>
        </div>
    )
}

export default Dashboard;