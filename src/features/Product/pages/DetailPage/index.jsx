import { Box, Container, Grid, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { alpha } from '@mui/system';

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
    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <LeftColumn item>
                            Thumbnail
                        </LeftColumn>
                        <RightColumn item>
                            Product
                        </RightColumn>
                    </Grid>
                </Paper>
            </Container> 
        </Box>
    );
}

export default DetailPage;