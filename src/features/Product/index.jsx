import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/LisPage';

function ProductFeature(props) {
    return (
        <Box pt={4}>
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/:productId/*" element={<DetailPage />}>
                </Route>
            </Routes>
        </Box>
    );
}

export default ProductFeature;