// import Layout from "../pages/Layout";

function About() {
  return (
    <>
      <div className="about-container">
        <img
          className="about-image"
          src="https://hammondsplainsvet.ca/wp-content/themes/hammondsplainsvet/images/banner-img.jpg"
        // src="https://images.ctfassets.net/rt5zmd3ipxai/2az0KZmsMxmpJWPSHGpLxL/e7ff7459f06e7eafa5e74f3c00d9e08c/NVA-Cat-Carpet.png?fit=fill&fm=webp&h=400&w=1366&q=72,%20https://images.ctfassets.net/rt5zmd3ipxai/2az0KZmsMxmpJWPSHGpLxL/e7ff7459f06e7eafa5e74f3c00d9e08c/NVA-Cat-Carpet.png?fit=fill&fm=webp&h=800&w=2732&q=72"
        />
        <div className="about-text">
          <h1>About Pet MD</h1>
          <h3>
            Pet MD is a place where you can keep and track your pets medical
            information. You can also upload vaccination records so you dont
            have to bring stacks of paper to the vet
          </h3>
          <h3>
            Add as many pets as you want to your profile. Add pictures of your
            pets
          </h3>
          <h3>
            keep track of any new health issues and concerns with your animal
          </h3>
        </div>
      </div>
    </>
  );
}

export default About;
