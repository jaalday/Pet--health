import ErrorCSS from "./Error.module.css"




const Error = () => {
    return(

        <>
        <div className={ErrorCSS.brokenSign}>
            <img src="https://media.wusa9.com/assets/WUSA/images/dc6deeb2-8502-439d-aa13-9cf9aed6f3f2/dc6deeb2-8502-439d-aa13-9cf9aed6f3f2_750x422.jpg"/>
        <h1 className={ErrorCSS.text}>Oh no! You Broke It!</h1>
        </div>
        </>

    )
}

export default Error