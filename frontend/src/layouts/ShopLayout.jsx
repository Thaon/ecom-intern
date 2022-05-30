import Head from "next/head";
import React, { Fragment, useCallback, useState } from "react";

const ShopLayout = ({ children, navbar, title, description }) => {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>{title ?? "Ecommerce!"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description ?? "Ecommerce!"} />
      </Head>
      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}
    </Fragment>
  );
};

export default ShopLayout;
