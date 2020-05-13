import React from 'react';
import MyNavbar from '../navbar/navBar';

import '../styles/main.css';




const Contact = (props) => {
    return (
        <div className="contact">
            <MyNavbar {...props} />
            <div className="container">

                <section className="mb-4">

                    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>

                    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

                    <div className="row">
                        <div className="col-md-12 mb-md-0 mb-5">
                            <form id="contact-form" name="contact-form" action="mail.php" method="POST">

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="md-form mb-0">
                                            <label for="name" className="">Your name</label>
                                            <input type="text" id="name" name="name" className="form-control" />
                                        </div>
                                    </div>



                                    <div className="col-md-6 mb-3">
                                        <div className="md-form mb-0">
                                            <label for="email" className="">Your email</label>
                                            <input type="text" id="email" name="email" className="form-control" />
                                        </div>
                                    </div>


                                </div>



                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="md-form mb-0">
                                            <label for="subject" className="">Subject</label>
                                            <input type="text" id="subject" name="subject" className="form-control" />
                                        </div>
                                    </div>
                                </div>



                                <div className="row">


                                    <div className="col-md-12 mb-3">

                                        <div className="md-form">
                                            <label for="message">Your message</label>
                                            <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                        </div>

                                    </div>
                                </div>


                            </form>

                            <div className="text-center text-md-left mt-3">
                                <button className="myBlueButton-lg btn-block"> Send </button>
                            </div>
                            <div className="status"></div>
                        </div>






                    </div>

                </section>

            </div>
        </div>
    );
}

export default Contact;