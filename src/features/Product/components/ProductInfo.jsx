import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { alpha } from '@mui/system';
import { formatPrice } from 'utils';

const RootProductInfo = styled('div')({
    paddingBottom: '16px',
    borderBottom: `1px solid ${alpha('#9e9e9e', 0.25)}`,
})

const Description = styled('div')({
    margin: "16px 0",
});

const PriceBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: "16px",
    backgroundColor: alpha('#9e9e9e', 0.1),
});

const SalePrice = styled('div')({
    marginRight: "24px",
    fontSize: "40px",
    fontWeight: 'bold',
});

const OriginalPrice = styled('div')({
    marginRight: "16px",
    textDecoration: 'line-through',
});

const PromotionPercent = styled('div')({

});

ProductInfo.propTypes = {
    product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
    const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
    return (
        <RootProductInfo>
            <Typography component="h1" variant='h4'>{name}</Typography>
            <Description>
                <Typography variant='body2'>{shortDescription}</Typography>
            </Description>

            <PriceBox>
                <SalePrice component='span'>{formatPrice(salePrice)}</SalePrice>
                {promotionPercent > 0 && (
                    <>
                        <OriginalPrice component='span'>{formatPrice(originalPrice)}</OriginalPrice>
                        <PromotionPercent component='span'>{`-${promotionPercent}%`}</PromotionPercent>
                    </>
                )}

            </PriceBox>
        </RootProductInfo>
    );
}

export default ProductInfo;