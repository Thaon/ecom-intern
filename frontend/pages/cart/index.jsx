import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  Button,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useCart } from "react-use-cart";

// payments
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

function Cart() {
  const { isEmpty, totalItems, items, updateItemQuantity, removeItem } =
    useCart();

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputFocus = (e) => {
    setCardDetails({
      ...cardDetails,
      focus: e.target.name,
    });
  };

  const handleInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (isEmpty)
    return (
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: "100vh" }}
      >
        <Typography variant="h6">Your cart is empty</Typography>
      </Grid>
    );

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid container justifyContent={"center"}>
          <h1>My Cart ({totalItems})</h1>
        </Grid>
        <Grid container justifyContent={"center"} sx={{ mb: 5 }}>
          <List>
            {items.map((item) => (
              <ListItem key={item.id}>
                <Grid item xs={12}>
                  <Grid container justifyContent={"flex-end"}>
                    <IconButton
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <AddBoxIcon />
                    </IconButton>
                    <IconButton onClick={() => removeItem(item.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>

                  <Paper elevation={3} sx={{ p: 3 }}>
                    <Grid container spacing={3} padding={2}>
                      <Avatar
                        src={item.image}
                        sx={{ width: 100, height: 100 }}
                      />

                      <Grid item>
                        <Grid item>
                          <Typography variant="h4">{item.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="h5">
                            {item.quantity} x €{(item.price / 100).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid container flexDirection={"row"} item xs={6} sx={{ mb: 5 }}>
          <Grid item xs={6}>
            <Cards
              cvc={cardDetails.cvc}
              expiry={cardDetails.expiry}
              focused={cardDetails.focus}
              name={cardDetails.name}
              number={cardDetails.number}
            />
          </Grid>
          <Grid
            container
            item
            xs={6}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <TextField
              name="number"
              type="number"
              placeholder="Card Number"
              label="Card Number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              name="name"
              placeholder="Cardholder Name"
              label="Cardholder Name"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              name="expiry"
              placeholder="Expire Date"
              label="Expire Date"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              size="small"
            />
            <TextField
              name="cvc"
              placeholder="CVC"
              label="CVC"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"} sx={{ mb: 5 }}>
          <Grid item xs={4}>
            <Button fullWidth variant="contained">
              CHECKOUT
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Cart;
