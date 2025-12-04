import { useEffect, useState } from "react";
import "./ItemDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { loadItemById, clearSelectedItem } from "../../features/items/itemSlice.js";
import { useDispatch, useSelector } from "react-redux";


export default function ItemDetails() {
  const {id} = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {selectedItem, loadingItem, errorItem} = useSelector((state) => state.users); 

  useEffect(() => {
    if (id) {
      dispatch(loadItemById(id));
    }
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [id, dispatch]);
  

  function handleBack() {
    navigate(-1);
  }

  if (loadingItem) {
    return (
      <div className="container">
        <section className="card">
          <p>Loading details...</p>
        </section>
      </div>
    );
  }

  if (errorItem) {
    return (
      <div className="container">
        <section className="card">
          <p>Error: {errorItem}</p>
          <button onClick={handleBack}>← Back</button>
        </section>
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="container">
        <section className="card">
          <p>Not found.</p>
          <button onClick={handleBack}>← Back</button>
        </section>
      </div>
    );
  }

  const { name, username, email, phone, website, address, company } = selectedItem;

  return (
    <div className="container">
      <section className="card details">
        <button className="details__back" onClick={handleBack}>
          ← Back
        </button>

        <h1>{name}</h1>

        <ul className="details__list">
          <li><b>Username:</b> {username}</li>
          <li><b>Email:</b> {email}</li>
          <li><b>Phone:</b> {phone}</li>
          <li><b>Website:</b> {website}</li>
          <li><b>City:</b> {address?.city}</li>
          <li><b>Street:</b> {address?.street}</li>
          <li><b>Company:</b> {company?.name}</li>
        </ul>
      </section>
    </div>
  );
}
