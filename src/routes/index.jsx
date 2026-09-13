import React, { Component } from "react";
import { connect } from "react-redux";
import {
    BrowserRouter,
    Routes as Switch,
    Route,
    Navigate,
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";

import baseRoutes from "./base";
import * as Actions from "../store/actions";
import { PrivateRoute } from "../components";
import Loading from "../components/Loading";

const withRouter = (Child) => {
    const WithRouter = (props) => {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();

        return (
            <Child
                {...props}
                navigate={navigate}
                params={params}
                location={location}
            />
        );
    };

    WithRouter.displayName =
        `withRouter(${Child.displayName || Child.name || "Component"})`;

    return WithRouter;
};

const connectedRoutes = {
    public: baseRoutes.public.map((route) => ({
        ...route,
        component: connect(
            (state) => state,
            Actions
        )(withRouter(route.component)),
    })),

    private: baseRoutes.private.map((route) => ({
        ...route,
        component: connect(
            (state) => state,
            Actions
        )(withRouter(route.component)),
    })),
};

class Routes extends Component {
    componentDidMount() {
        const token = localStorage.getItem("token");

        if (token) {
            this.props.load();
        }
    }

    renderRoutes = (routes, isPrivate = false) => {
        return routes.map((route) => {
            const Page = route.component;

            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        isPrivate ? (
                            <PrivateRoute admin={this.props.admin}>
                                <Page />
                            </PrivateRoute>
                        ) : (
                            <Page />
                        )
                    }
                />
            );
        });
    };

    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={<Loading size="big" />}>
                    <Switch>

                        {/* Public */}
                        {this.renderRoutes(
                            connectedRoutes.public
                        )}

                        {/* Private */}
                        {this.renderRoutes(
                            connectedRoutes.private,
                            true
                        )}

                        {/* 404 */}
                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/"
                                    replace
                                />
                            }
                        />

                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

export default connect(
    (state) => state,
    Actions
)(Routes);