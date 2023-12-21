import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import Postulation from './routes/Postulation.jsx';
import Reserve from './routes/Reserve.jsx';
import Reserve2 from './routes/Reserve2.jsx';
import Reserve3 from './routes/Reserve3.jsx';
import Reserve4 from './routes/Reserve4.jsx';
import ViewReserve from './routes/viewReserves.jsx';
import DeleteReserve from './routes/DeleteReserve.jsx';
import ReservesByRut from './routes/GetReserveRut.jsx';
import ReservesById from './routes/GetReserveId.jsx';
import PendingRenewer from './routes/PendingRenewer.jsx';
import Renewer from './routes/Renewer.jsx';
import PendingPostulation from './routes/PendingPostulation.jsx';
import PostulationDetail from './routes/PostulationDetail.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import SendMail from './routes/SendMail.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/crearPostulacion',
        element: <Postulation />,
      },

      {
        path: '/crearReservaTeorica',
        element: <Reserve />,
      },

      {
        path: '/crearReservaPsicotecnica',
        element: <Reserve2 />,
      },

      {
        path: '/crearReservaOftalmologica',
        element: <Reserve3 />,
      },

      {
        path: '/crearReservaPractica',
        element: <Reserve4 />,
      },

      {
        path: '/VerReserva',
        element: <ViewReserve />,
      },

      {
        path: '/EliminarReserva',
        element: <DeleteReserve />,
      },

      {
        path: '/BuscarReservaRut',
        element: <ReservesByRut />,
      },

      {
        path: '/BuscarReservaId',
        element: <ReservesById />,
      },

      {
        path: '/crearRenovacion',
        element: <Renewer />,
      },
      
      {
        path: '/verPostulacionesPendientes',
        element: <PendingPostulation />,
      },
            {
        path: '/verRenovacionesPendientes',
        element: <PendingRenewer />,
      },
      {
        path: '/verDetallePostulacion/:postId',
        element: <PostulationDetail />,
      },

      {
        path: '/enviarCorreo',
        element: <SendMail />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
