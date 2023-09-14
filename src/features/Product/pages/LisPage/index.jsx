import { Box, Grid, Container, Paper, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import productApi from 'api/productApi';
import ProductSkeleton from 'features/Product/components/ProductSkeleton';
import ProductList from 'features/Product/components/ProductList';
import ProductSort from 'features/Product/components/ProductSort';
import ProductFilters from 'features/Product/components/ProductFilters';
import FilterViewer from 'features/Product/components/Filters/FilterViewer';

import { useLocation, useNavigate } from 'react-router-dom';

const LeftColumn = styled('div')({
    width: '250px',
});

const RightColumn = styled('div')({
    flex: '1 1 0',
});

const Paginations = styled('div')({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: "30px",
    paddingBottom: "20px",
});


function ListPage(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        page: 1,
        total: { data: 10 },
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:ASC',
    });

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
            } catch (err) {
                console.log('Failed to fetch product list', err);
            } finally {
                setLoading(false);
            };

        })();
    }, [filters]);

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page,
        }));
    };

    const handleSortChange = (newSortValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue,
        }));
    };
    const handleFiltersChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));

        const searchParams = new URLSearchParams(location.search);
        for (const key in newFilters) {
            searchParams.set(key, newFilters[key]);
        }
        navigate(`?${searchParams.toString()}`);

    };

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <LeftColumn>
                        <Paper elevation={0}>
                            <ProductFilters filters={filters} onChange={handleFiltersChange} />
                        </Paper>
                    </LeftColumn>
                    <RightColumn>
                        <Paper elevation={0}>
                            <ProductSort currenSort={filters._sort} onChange={handleSortChange} />
                            <FilterViewer filters={filters} onChange={setFilters} />

                            {loading ? <ProductSkeleton length={9} /> : <ProductList data={productList.data} />}
                            <Paginations>
                                <Pagination
                                    count={Math.ceil(pagination.total.data / pagination.limit)}
                                    color="primary"
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                />
                            </Paginations>

                        </Paper>
                    </RightColumn>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;