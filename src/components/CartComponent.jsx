import React from 'react';
function CartComponent() {

    //Hämtar alla items från cart
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    return (
      <>
        <div className="order-container">
          <div className="order-box">
            <h1 className="order-title">Orders</h1>
            <div className="red-line-orders"></div>

            {cartItems.map((item, index) => (
              <div key={index}>
                <h1>{item.title}</h1>

                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}

export default CartComponent;

