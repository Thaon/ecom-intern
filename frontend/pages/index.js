import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Paper, Typography, Button } from "@mui/material";

// utils
import ShopLayout from "layouts/ShopLayout";
import NavBar from "components/NavBar";
import HoverBox from "components/HoverBox";

// static data
import data from "utils/staticData";

export default function Home() {
  const products = data.products;

  const router = useRouter();
  return (
    <ShopLayout navbar={<NavBar title={"My Ecommerce!"} />}>
      <Grid container spacing={3} padding={10} justifyContent={"center"}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} md={2} key={product.id}>
            <Paper>
              <HoverBox
                sx={{ p: 5, borderRadius: 1 }}
                onClick={() => {
                  router.push("/products/[id]", `/products/${product.id}`);
                }}
              >
                <Typography variant="h6">
                  {product.name} €{(Number(product.price) / 100).toFixed(2)}
                </Typography>
                <Image src={product.image} width={200} height={200} />
              </HoverBox>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  );
}
