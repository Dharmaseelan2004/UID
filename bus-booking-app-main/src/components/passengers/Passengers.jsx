import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addPassengerData, addBookingDetails, removeBookingDetails } from "../../store/seatsSlice";
import { useDispatch } from "react-redux";

const Passengers = () => {
  const [passengersData, setPassengersData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeData = (event) => {
    event.preventDefault();
    setPassengersData({
      ...passengersData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitData = (event) => {
    event.preventDefault();
    const mobilePattern = /^[0-9]{10}$/;

    if (
      passengersData.name !== "" &&
      mobilePattern.test(passengersData.mobile) &&
      passengersData.email !== ""
    ) {
      dispatch(addPassengerData(passengersData));
      dispatch(addBookingDetails());
      alert("Bus Tickets Booked Successfully!");
      history.push("/mybooking");
      dispatch(removeBookingDetails());
    } else {
      alert("Please fill all the details correctly.");
    }
  };

  // Function to navigate to another page when the new button is clicked
  const handleNavigate = () => {
    history.push("/passenger-details");
  };

  return (
    <>
      <h3 className="mg">Passenger Details:</h3>
      <form className="flex2 ml">
        <div className="flexColumn">
          <input
            className="input"
            type="text"
            name="name"
            value={passengersData.name}
            placeholder="Name"
            onChange={handleChangeData}
            required={true}
          />
          <input
            className="input"
            type="tel"
            value={passengersData.mobile}
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            onChange={handleChangeData}
            required={true}
          />
          <input
            className="input"
            type="email"
            value={passengersData.email}
            name="email"
            placeholder="Email"
            onChange={handleChangeData}
            required={true}
          />
          <button className="payBtn" type="submit" onClick={handleSubmitData}>
            <h3>Pay & Book</h3>
          </button>
          <button
            type="button"
            onClick={handleNavigate}
            style={{
              marginTop: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Passenger Details
          </button>
        </div>
      </form>
    </>
  );
};

export default Passengers;
