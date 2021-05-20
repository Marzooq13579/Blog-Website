import React from 'react';
import {useLocation,useHistory} from "react-router-dom";

const Post = () => {
    const history = useHistory();
    const location = useLocation()
    const {postedBy,title,body} = location.state

    return (
        <div className="card home-card">
            <h4>{postedBy}</h4>
            <div className="card-content">
                <h5>{title}</h5>
                <p>{body}</p>
                <br></br>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" style={{textAlign:'center',marginLeft:"40%"}} onClick={() =>history.push("/")}>
          Go Back
        </button>
            </div>
        </div>  
    )
}

export default Post;


