import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/routes.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import '../src/firebase/firebaseServises/uploadData.js'
import { AuthProvider } from './Components/AuthProvider.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
   <BrowserRouter basename="/BlossomBreeze">
 <Provider store={store}>
    <AuthProvider>
 <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </AuthProvider>
    </Provider>
    </BrowserRouter>
)
