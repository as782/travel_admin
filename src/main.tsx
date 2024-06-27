 
import ReactDOM from 'react-dom/client'
 
import 'normalize.css'
import './index.css'

 
import { RouterProvider } from 'react-router-dom'
import router from '@routers'

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
