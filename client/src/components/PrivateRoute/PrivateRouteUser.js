import {Redirect, Route} from 'react-router'
import {useSelector} from 'react-redux'

const PrivateRouteUser = ({component : Component, ...rest}) => {
    
    const user = useSelector(state => state.session.user)
    
    return (
        <Route {...rest}>{user.role ? <Component/> : <Redirect to='/admin/categoryCreation'/>}</Route>
    )
}
export default PrivateRouteUser