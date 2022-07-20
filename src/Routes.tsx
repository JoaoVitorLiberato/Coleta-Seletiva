import {BrowserRouter, Route, Routes as RoutesWapper} from 'react-router-dom'
import Home from './pages/Home';
import CreateLocation from './pages/CreateLocation/';


export default function Routes(){
    return(
        <BrowserRouter>
            <RoutesWapper>
                <Route path='/' element={<Home/>} />
                <Route path='/create-location' element={<CreateLocation/>} />
            </RoutesWapper>
        </BrowserRouter>
    );
}