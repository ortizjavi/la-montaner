import {Redirect, Route} from 'react-router'
import {useSelector} from 'react-redux'
import { ROLE } from '../../utils/constants';

const PublicRoute = ({component : Component, ...rest}) => {
    
    const user = useSelector(state => state.session.user);
    return (
        <Route {...rest}>
        { !user.role ? 
			<Component/> :
            user.role === ROLE.ADMIN ?
    			    <Redirect to='/admin'/> :
                       <Redirect to='/dashboard'/>
		}
        </Route>
    )
}
export default PublicRoute;