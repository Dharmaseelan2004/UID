import React, { useState } from 'react';
import moment from 'moment';
import Heading from '../../common/Heading';
import './main.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    date: moment().format('YYYY-MM-DD'),
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.name && formData.from && formData.to && formData.date) {
      // Save the formData to local storage
      localStorage.setItem('busBookingDetails', JSON.stringify(formData));
      alert('Details saved locally!');

      try {
        const response = await fetch('http://localhost:5000/api/reserve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          history.push(
            `/searchbus?name=${formData.name}&from=${formData.from}&to=${formData.to}&date=${formData.date}`
          );
        } else {
          alert('Error: ' + result.message);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('Please fill in all the fields before submitting.');
    }
  };

  const handleShowDetails = () => {
    const storedDetails = localStorage.getItem('busBookingDetails');
    if (storedDetails) {
      const details = JSON.parse(storedDetails);
      alert(
        `Name: ${details.name}\nFrom: ${details.from}\nTo: ${details.to}\nDate: ${details.date}`
      );
    } else {
      alert('No details found in local storage.');
    }
  };

  return (
    <section className="main">
      <div className="container">
        <Heading title="Search Your Bus and Book Now" subtitle="Find the bus with great deals and discounts. Enjoy your Journey." />
        <form className="flex" onSubmit={handleSubmit}>
          <div className="box">
            <span>Name</span>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="box">
            <span>From</span>
            <input
              name="from"
              type="text"
              placeholder="Location"
              onChange={handleChange}
              value={formData.from}
              required
            />
          </div>
          <div className="box">
            <span>To</span>
            <input
              name="to"
              type="text"
              placeholder="Destination"
              onChange={handleChange}
              value={formData.to}
              required
            />
          </div>
          <div className="box">
            <span>Pick a Date</span>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              min={moment().format('YYYY-MM-DD')}
              value={formData.date}
              required
            />
          </div>
          <div className="box">
            <button type="submit" className="flex">
              <AiOutlineSearch className="iconSearch" />
              <h3>Search Buses</h3>
            </button>
          </div>
        </form>
        <div className="box">
          <button className="show-details-btn" onClick={handleShowDetails}>
            Show Stored Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Main;
