import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter,MDBBtn,MDBIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const FooterPagePro = () => {
  return (
    <MDBFooter color="mdb-color" className="font-small lighten-3 pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="my-4">
          <MDBCol md="4" lg="4">
            <h5 className="text-uppercase mb-4 font-weight-bold">
            WHY RIDE SHARE?
            </h5>
            <p>
            The
            objective is to serve all those users who are going on short journeys, have some seats
            vacant and are willing to share their.{" "}
            </p>
            <p>user-friendly.This application helps the users to create rides and also find rides with
the same destination at same time.The user can opt for the most convenient ride out of
the displayed rides and the deatils are pulled out.This application mainly aims at
reducing the cost of travel and provide security.</p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="2" lg="2" className="ml-auto">
            <h5 className="text-uppercase mb-4 font-weight-bold">About</h5>
            <ul className="list-unstyled">
              <p>
                <a href="/contactus">CONACT US</a>
              </p>
              <p>
                <a href="/about">ABOUT US</a>
              </p>
            </ul>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="5" lg="3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Address</h5>
            <p>
              <i className="fa fa-home mr-3" /> Hyderabad
            </p>
            <p>
              <i className="fa fa-envelope mr-3" /> ride@gnits.com
            </p>
            <p>
              <i className="fa fa-phone mr-3" /> 040 255767
            </p>
            <p>
              <i className="fa fa-print mr-3" /> 040 456754
            </p>
          </MDBCol>
          
          <hr className="clearfix w-100 d-md-none" />
        </MDBRow>
      </MDBContainer>
      <MDBContainer>
      <a href="#!" className="fb-ic mr-3">
        <MDBIcon fab icon="facebook-f" />
      </a>
      <a href="#!" className="tw-ic mr-3">
        <MDBIcon fab icon="twitter" />
      </a>
      <a href="#!" className="gplus-ic mr-3">
        <MDBIcon fab icon="google-plus-g" />
      </a>
      <a href="#!" className="li-ic mr-3">
        <MDBIcon fab icon="linkedin-in" />
      </a>
      <a href="#!" className="ins-ic mr-3">
        <MDBIcon fab icon="instagram" />
      </a>
      <a href="#!" className="pin-ic mr-3">
        <MDBIcon fab icon="pinterest" />
      </a>
      <a href="#!" className="yt-ic mr-3">
        <MDBIcon fab icon="youtube" />
      </a>
      <a href="#!" className="vk-ic mr-3">
        <MDBIcon fab icon="vk" />
      </a>
      <a href="#!" className="so-ic mr-3">
        <MDBIcon fab icon="stack-overflow" />
      </a>
      <a href="#!" className="slack-ic mr-3">
        <MDBIcon fab icon="slack" />
      </a>
      <a href="#!" className="git-ic mr-3">
        <MDBIcon fab icon="github" />
      </a>
      <a href="#!" className="comm-ic mr-3">
        <MDBIcon icon="comments" />
      </a>
      <a href="#!" className="email-ic mr-3">
        <MDBIcon icon="envelope" />
      </a>
      <a href="#!" className="dribbble-ic mr-3">
        <MDBIcon fab icon="dribbble" />
      </a>
    </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.MDBootstrap.com"> Rideshare</a>
        </MDBContainer>
       
      </div>
    </MDBFooter>
  );
}

export default FooterPagePro;