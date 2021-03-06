import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate} from '../auth';
class Signin extends Component {
    constructor(){
        super()
        this.state={

            email:"",
            password:"",
            error:"",
            redirectToReferer:false,
            loading:false
        }
    }

    handleChange = name => event =>{
        this.setState({error:""})
        this.setState({ [name]:event.target.value });
    };

  

    clickSubmit = event => {

         event.preventDefault();
         this.setState({loading:true});
        const {email,password} =this.state;
        const user = {
             email,
             password
        }

        signin(user).then(data=>{
            if(data.error) {
                this.setState({ error:data.error ,loading:false });
            }
            else {
                //authenticated
                authenticate(data,()=>{
                    this.setState({redirectToReferer:true});
                });
                //redirect
            }
        })

    };




    signinForm = (email,password) => (
                            <form>
                                        

                                            <div className="form-group">
                                                <label className="text-muted">Email</label>
                                                <input onChange={this.handleChange("email")}  className="form-control" type="email" value={email}/>
                                            </div>

                                            <div className="form-group">
                                                <label className="text-muted">Password</label>
                                                <input onChange={this.handleChange("password")} className="form-control" type="password" value={password}/>
                                            </div>

                                            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                            </form>
    );

    render() {

        const {email,password,error,redirectToReferer,loading} =this.state;
        if(redirectToReferer){
            return <Redirect to="/"/>
        }

        return (
            <div className="container">
               
                <h2 className="mt-5 mb-5">Signin Page</h2>

                            
                            <div className="alert alert-danger" style={{display:error ? "":"none"}}>{error}</div>
                     
                            {loading ? <div className="jumbotron text-center"> <h2>Loading...</h2> </div>:""}     

                            {this.signinForm(email,password)}

                                     <p>
                                    <Link to="/forgot-password" className="text-danger">
                                        {" "}
                                        Forgot Password
                                    </Link>
                                    </p>
            </div>
        )
    }
}
export default Signin;