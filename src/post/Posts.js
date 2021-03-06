import React, { Component } from 'react'
import {list} from './apiPost';
import DefaultProfile from '../images/moutain.jpg';
import { Link } from 'react-router-dom';
 class Posts extends Component {
     constructor(){
         super()
         this.state={
             posts:[],
              page: 1
         };
     }

     componentDidMount() {
           this.loadPosts(this.state.page);
         list().then(data=>{
                if(data.error){
                    console.log(data.error);
                }
                else{

                    this.setState({posts:data});
                }
         });
     }

     loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };
     renderPosts=(posts)=>{
         return (
                  <div className="row">
                   {  posts.map((post,i)=>{
                       const posterId = post.postedBy ? `/user/${post.postedBy._id}`:""
                       const posterName = post.postedBy ? post.postedBy.name:"Unknown"
                    return(
                                <div className="card col-md-4" key={i}>
                                 {/* <img style={{height:"300px",width:"auto"}} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={(i=>(i.target.src=`${DefaultProfile}`))} alt={user.name}/> */}
                                <div className="card-body">
                                <img className="img-thumbnail mb-3" style={{height:"200px",width:"auto"}}  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.name} onError={(i=>(i.target.src=`${DefaultProfile}`))}/>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.body.substring(0,100)}</p>
                                    <br/>
                                    <p className="font-italic mark">Posted By{""} <Link to={`${posterId}`}>{posterName}{""}</Link>
                                    on {new Date(post.created).toDateString()}
                                    </p>
                                    <Link to={`/post/${post._id}`} href="#" className="btn btn-raised btn btn-primary btn-small">Read More
                                    </Link>
                                </div>
                                </div>
                    ); 
                   }
                   )
                   }

        </div>
         );
     };
         
 

    render() {
        const { posts ,page} = this.state;
        return (
            <div className="container">
                    <h2 className="mt-5 mb-5">
                       Recent Posts
                    </h2>

              
                      {this.renderPosts(posts)}
                                  
                
                   {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous ({this.state.page - 1})
                    </button>
                ) : (
                    ""
                )}
 
                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next ({page + 1})
                    </button>
                ) : (
                    ""
                )}
            </div>
        )
    }
}
export default Posts;