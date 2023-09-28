import { Box, Container, Grid, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { alpha } from '@mui/system';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import { Route, Routes, useParams } from 'react-router-dom';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import ProductInfo from 'features/Product/components/ProductInfo';
import AddToCartForm from 'features/Product/components/AddToCartForm';
import ProductMenu from 'features/Product/components/ProductMenu';
import ProductAdditional from 'features/Product/components/ProductAdditional';
import ProductDescription from 'features/Product/components/ProductDescription';
import ProductReviews from 'features/Product/components/ProductReviews';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/Cart/cartSlice'
const customGray = alpha('#9e9e9e', 0.5);

const LeftColumn = styled('div')({
    width: '400px',
    padding: '10px',
    borderRight: `1px solid ${customGray}`,
});

const RightColumn = styled('div')({
    flex: '1 1 0',
    padding: '10px',
});

function DetailPage() {
    const { productId } = useParams();
    const { product, loading } = useProductDetail(productId);
    const dispatch = useDispatch()

    if (loading) {return <Box> Loading </Box>}

    const handleAddToCartSubmit = ({quantity}) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity,
        });
        dispatch(action)
    };
    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <LeftColumn item>
                            <ProductThumbnail product={product}  />
                        </LeftColumn>
                        <RightColumn item>
                            <ProductInfo product={product}/>
                            <AddToCartForm onSubmit={handleAddToCartSubmit}/>
                        </RightColumn>
                    </Grid>
                </Paper>
                
                <ProductMenu />
                <Routes>
                    <Route path='/' element={<ProductDescription product={product} />}/> 
                    <Route path='/additional' element={<ProductAdditional product={product} />} />
                    <Route path='/reviews' element={<ProductReviews product={product} />} />
                </Routes>
            </Container> 
        </Box>
    );
}

export default DetailPage;