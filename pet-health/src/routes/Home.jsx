import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClients";

function Home() {
  console.log(supabase);
  return (
    <>
      {/* <Navigation/> */}
      {/* <img className="banner"src="https://as2.ftcdn.net/v2/jpg/06/04/83/05/1000_F_604830538_RZwbSE2i0ksmHorOPjr73v51avRUSfDR.jpg"/> */}
      {/* <img className="banner" src="https://www.mountainsidevet.com/wp-content/uploads/sites/295/2022/08/staff.jpg"/> */}
      {/* <img */}
      <img
        className="banner"
        src="https://images.ctfassets.net/rt5zmd3ipxai/4uCsNpmbcgKyzCJUuhpqx5/978bdf8b0b672e963bb63b1ffa47bb26/_mobile__NVA-Clinic-cat-vet-holding-left.jpeg"
      />{" "}
      <div className="h1">
        <h1>Pet MD</h1>
        <p>
          A place to keep track of your
          <br />
          pets medical information
        </p>
      </div>
      {/* <img
        className="banner"
        src="https://t3.ftcdn.net/jpg/06/94/66/48/360_F_694664845_9HgcrfMeB2gEg5wD5BBYu6lrwRFGaEXy.jpg"
      /> */}
      <div className="info-box">
        <div className="inner-info1">
          <div className="card-1">

            <Link to="/about">
            <img
              className="img-1"
              src="https://t2.ea.ltmcdn.com/en/posts/2/7/1/tobramycin_for_dogs_uses_dosage_and_side_effects_4172_600.jpg"
            /></Link>
          </div>
          <div className="card-2">

          <Link to="/users/add">
            <img
              className="img-2"
              src="https://www.montevistavet.com/files/turlock_vet/puppies-kittens.jpg"
            /></Link>
          </div>
          <div className="card-3">
            <Link to="/login">
            <img
              className="img-3"
              src="https://res.cloudinary.com/embark/images/f_auto,q_auto/v1659364976/embarkvet.com/uploads/brown-puppy-with-veterinarian/brown-puppy-with-veterinarian.jpg?_i=AA"
            /></Link>
          </div>

          {/* <img  className="card-image"src="https://theanimalclinicatmissionsquare.com/wp-content/uploads/2021/01/Services-3.png"/> */}
        </div>
      </div>
    </>
  );
}

export default Home;
