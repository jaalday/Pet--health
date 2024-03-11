import PropTypes from "prop-types";
// import './App.css'
import {Link} from 'react-router-dom';




const Navigation = ({ navItems }) => {


  return (
    <>
     <nav>
        <div className="navBar">
        <Link to="/">
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMDCB7KPoHjJAtiJk5DhwB5s6epxhFWu7SQjoPNnnKnotPsO-4mdS6GmbNtG2XfiF0vXE&usqp=CAU"/>
        </Link>
        <h2 className="h2">Pet MD</h2>
        <div className="nav-text">
           
                <div className="nav-text">
                {navItems.map((link, index) => {
                    return (<p className="nav-text" key={`${index}`}>
                        <Link to = {link.url}>{link.title}</Link>
                

                        </p> )
                })}
                </div>
           

          


        </div>
            <Link to="./login">
            <button className="sign-in">Log In</button></Link>
            
                
        </div>
        </nav>



    
    
    </>





  )





}
Navigation.propTypes= {
    navItems: PropTypes.array,
}

export default Navigation;