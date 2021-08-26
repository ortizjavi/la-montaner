import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const user = useSelector(state => state.session.user)
    const loading = useSelector(state => state.session.loading)

    return (

        <Route {...rest}>
            { loading ? <Loading/> :
                <>
                {user.reset && rest.path !== '/reset' ? <Redirect to='/reset' /> :
                    roles.includes(user.role) ?
                        <Component /> :
                        <Redirect to='/login' />
                }
                </>
            }
        </Route>
    )
}
export default PrivateRoute;