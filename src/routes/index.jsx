import React, { Component } from "react";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import {
    BrowserRouter,
    Routes as Switch,
    Route,
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";

import baseRoutes from "./base";
import * as Actions from "../store/actions";
import { PrivateRoute, Layout } from "../components";
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
        const role = localStorage.getItem("role");

        const tokenKey =
            role === "admin"
                ? "adminToken"
                : "lecturerToken";

        const token = localStorage.getItem(tokenKey);

        if (token) {
            this.props.load();
        }
    }

    renderPublicRoutes = (routes) => {
        return routes.map((route) => {
            const Page = route.component;

            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<Page />}
                />
            );
        });
    };

    renderPrivateRoutes = (routes) => {
        return (
            <Route
                element={
                    <PrivateRoute admin={this.props.admin}>
                        <Layout />
                    </PrivateRoute>
                }
            >
                {routes.map((route) => {
                    const Page = route.component;

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Page />}
                        />
                    );
                })}
            </Route>
        );
    };

    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={<Loading size="big" />}>
                    <Switch>

                        {/* Public */}
                        {this.renderPublicRoutes(
                            connectedRoutes.public
                        )}

                        {/* Private */}
                        {this.renderPrivateRoutes(
                            connectedRoutes.private,
                        )}

                        {/* 404 */}
                        <Route
                            path="*"
                            element={<NotFound />}
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