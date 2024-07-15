import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='body_image'>
           <Outlet></Outlet> 
        </div>
    );
};

export default Main;