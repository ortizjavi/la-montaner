import {Redirect, Route} from 'react-router'
import {useSelector} from 'react-redux'

const PrivateRouteAdmin = ({component : Component, ...rest}) => {
    
    const user = useSelector(state => state.root.user)
    
    return (
        <Route {...rest}>{user.role ? <Component/> : <Redirect to='/login'/>}</Route>
    )
}
export default PrivateRouteAdmin