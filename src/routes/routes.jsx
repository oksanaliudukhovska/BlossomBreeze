import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import BouquetsPage from "../Pages/BouquetsPage";
import OneBouquetPage from "../Pages/OneBouquetPage";
import UserProfile from "../Pages/UserProfile";
import Auth from "../Components/Auth";
import CartPage from "../Pages/CartPage";
import PlantsPage from "../Pages/PlantsPage";
import OnePlantPage from "../Pages/OnePlantPage";
import QandA from "../Pages/QandA";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: '/bouquets',
                element: <BouquetsPage/>
            },
            {
                path: '/bouquets/:bouquetId',
                element: <OneBouquetPage/>
            },
            {
                path: '/plants',
                element: <PlantsPage/>,
            },
            {
               path: '/plants/:plantId',
               element: <OnePlantPage/>
            },
            {
                path: '/cart',
                element: <CartPage/>
            },
            {
               path: '/auth',
               element: <Auth/>
            },
            {
                path: '/profile',
                element: <UserProfile/>
            },
            {
                path: '/questions',
                element: <QandA/>
            }
        ]
    }
])
export default router