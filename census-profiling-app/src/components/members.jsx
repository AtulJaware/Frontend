import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
class Members extends Component {
    state = {  
        members: [],
        };
        componentDidMount() {
          // send get request
          axios
            .get("http://localhost:8081/member")
            .then((response) => {
              console.log(response);
              this.setState({ members: response.data });
            })
            .catch((error) => console.log(error));
  };
      // Delete Member
  handleDelete = (id) => {
    // http://localhost:8081/member/{id}
    axios
      .delete(`http://localhost:8081/member/${id}`)
      .then((res) => {
        console.log(res);
        // return all members except mem which is selected for delete
        const mems = this.state.members.filter((mem) => mem.id !== id);

        // update state object with members
        this.setState({ members: mems });
        alert("Member with Id " + id + " deleted successfully!");
      })
      .catch((err) => console.log(err));
  };
    render() { 
        return (
            <div className="w-75 mx-auto">
            <h3 className="mt-4">Member's Data</h3>
            <Link to="/member/add" className="btn btn-primary float-end mb-2">
              Add New Member</Link>
            <table className="table w-75 mx-auto">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Marital Status</th>
                  <th>Qualification</th>
                  <th>Relationship</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.members.map((mem) => (
                  <tr key={mem.id}>
                    <td>{mem.id}</td>
                    <td>{mem.firstName}</td>
                    <td>{mem.lastName}</td>
                    <td>{mem.dob}</td>
                    <td>{mem.gender}</td>
                    <td>{mem.marital_status}</td>
                    <td>{mem.qualification}</td>
                    <td>{mem.relationShip}</td>
                    <td><Link to={`/member/update/${mem.id}`}>
                      <i className="bi bi-pencil-square me-3"
                            type="button"></i></Link>
                  <i className="bi bi-trash-fill"
                  type="button"
                  onClick={() => this.handleDelete(mem.id)} ></i></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
    }
}
 
export default Members;