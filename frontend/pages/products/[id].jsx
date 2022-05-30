import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";

import { Grid, Paper, Typography, Button } from "@mui/material";

// utils
import ShopLayout from "layouts/ShopLayout";
import NavBar from "components/NavBar";

// static data
import { products } from "utils/staticData";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { addItem } = useCart();

  const product = products.find((product) => product.id == id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ShopLayout
      navbar={<NavBar title={"Home"} description={product.description} />}
    >
      <Grid container spacing={3} padding={10} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Paper sx={{ p: 5 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="h6" sx={{ float: "right" }}>
              €{(Number(product.price) / 100).toFixed(2)}
            </Typography>
            <Image src={product.image} width={200} height={200} />
            <hr />
            <Typography variant="body1" sx={{ mb: 3, mt: 2 }}>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => addItem(product)}
            >
              ADD TO CART
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}
