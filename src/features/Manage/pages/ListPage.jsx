import styled from '@emotion/styled';
import { Box, Container, Grid, Paper } from '@mui/material';
import productApi from 'api/productApi';
import { useEffect, useState } from 'react';

const LeftColumn = styled('div')({
    width: '200px',
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

ListPage.propTypes = {

};

function ListPage(props) {
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        page: 1,
        total: { data: 10 },
    });
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 9,
        _sort: 'salePrice:ASC',
    });

    useEffect(() => {
        (
            async () => {
                try {
                    const { data, pagination } = await productApi.getAll(filters);
                    setProductList(data);
                    setPagination(pagination);
                } catch (err) {
                    console.log('Failed to fetch product list', err);
                }
            }
        )();
    }, []);
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <LeftColumn>
                        <Paper elevation={0}>
                            danh mục
                        </Paper>
                    </LeftColumn>
                    <RightColumn>
                        <Paper elevation={0}>
                            table
                        </Paper>
                    </RightColumn>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;