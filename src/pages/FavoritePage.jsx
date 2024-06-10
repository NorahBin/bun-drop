import React from "react";
import FavoriteComponent from "../components/FavoriteComponent";

function FavoritePage({ user }) {
  return (
    <>
      <FavoriteComponent userId={user && user.id} />
    </>
  );
}

export default FavoritePage;
