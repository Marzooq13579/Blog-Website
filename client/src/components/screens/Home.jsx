import React, { useState, useEffect, useContext } from "react";
import { Link,useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Pagination from '../Pagination';


const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  
  useEffect(() => {
    fetch("https://twim-project.herokuapp.com/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);
  
  const likePost = (id) => {
    fetch("https://twim-project.herokuapp.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const unlikePost = (id) => {
    fetch("https://twim-project.herokuapp.com/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      });
  };

  const makeComment = (text, postId) => {
    fetch("https://twim-project.herokuapp.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };


  const indexofLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexofLastPost - postsPerPage;
  const currentPosts = data.slice(indexofFirstPost,indexofLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      {currentPosts.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-content">
              <h4>{item.title}</h4>
              <Link to={{pathname:"/post",state:{postedBy:item.postedBy.name,title:item.title,body:item.body}}}>Read More...</Link>
              <h6>{item.likes.length} likes</h6>
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                >
                  thumb_up
                </i>
              )}
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    {" "}
                    <span style={{ fontweight: "20px" }}>
                      {record.postedBy.name}{" "}
                    </span>
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="Add a Comment" />
              </form>
            </div>
          </div>
        );
      })}
      <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate}/>
    </div>
  );
};

export default Home;
