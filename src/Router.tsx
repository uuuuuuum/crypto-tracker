import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import Chart from './routes/Chart';
import Price from './routes/Price';

interface IRouterProps {
    toggleDark: () => void;
    isDark: boolean;
}

function Router({ toggleDark, isDark }:IRouterProps) {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/:coinId" element={<Coin toggleDark={toggleDark} isDark={isDark} />}>
                <Route path="chart/*" element={<Chart isDark={isDark} />} />
                <Route path="price" element={<Price />} />
            </Route>
            <Route path="/" element={<Coins toggleDark={toggleDark} isDark={isDark} />} />
        </Routes>
    </BrowserRouter>
}
export default Router;