import {Redirect, Route} from 'react-router'
import {useSelector} from 'react-redux'

const PrivateRoute = ({component : Component, roles, ...rest}) => {
    
    const user = useSelector(state => state.session.user)
    if (!user){
    	return <div></div>;
    }
    return (
        <Route {...rest}>
        { roles.includes(user.role) ? 
			<Component/> : 
			<Redirect to='/admin/categoryCreation'/>
		}
        </Route>
    )
}
export default PrivateRoute;