import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const user = useSelector(state => state.session.user)
    console.log(user.reset)
    return (

        <Route {...rest}>
            {user.reset && rest.path !== '/reset' ? <Redirect to='/reset' /> :
                roles.includes(user.role) ?
                    <Component /> :
                    <Redirect to='/login' />
            }
        </Route>
    )
}
export default PrivateRoute;