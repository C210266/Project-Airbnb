import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


function SendEmail() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_vcmeaej',
            'template_dl036xt',
            form.current,
            'ikA1cwKTGRyo_z3e0'
        )
            .then((result) => {
                console.log(result.text);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
        <h2>Form feedback Anh Bach</h2>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    );
}

export default SendEmail