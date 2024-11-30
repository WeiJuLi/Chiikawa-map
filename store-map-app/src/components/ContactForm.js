import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // sending email 
import contactImg from '../images/contact.png'
//if you use Recaptcha 2 then use the below code cause v2 is visible and needs <ReCAPTCHA />
//import ReCAPTCHA from 'react-google-recaptcha'; // import reCAPTCHA component

const ContactForm = () => {
    const [issueType, setIssueType] = useState('');
    const [googleMapLink, setGoogleMapLink] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    


    const handleSubmit = async (e) => {
        // e : The e parameter is a conventional name for the event object. 
        // It's common to use e. 
        /*  
            the function takes one parameter, e, which represents the event object 
            that provides information about the event that just occurred.
            This object contains details about the event, such as which element triggered the event, 
            the type of event (e.g., click, change), and any additional information related to that event.

            The method e.preventDefault() is used to prevent the default action that belongs to the event.
            For example, when you submit a form, the default behavior is to refresh the page. 
            By calling e.preventDefault(), you stop that refresh from happening, 
            allowing you to handle the form submission with your own custom logic 
            (like sending the data to an email or database). 
        */
            e.preventDefault();

            // 呼叫 reCAPTCHA v3
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute('6Lc6vHYqAAAAAK38bFENBevPwbNwMkufBRi91jLH', { action: 'submit' }).then((token) => {
                    // 確保 reCAPTCHA token 獲取成功後執行後續的表單提交
                    submitForm(token);
                });
            });
        };
    
        // 提交表單資料和 reCAPTCHA token
        const submitForm = async (recaptchaToken) => {
            // 驗證 Google Map 連結
            const googleMapRegex = /^https:\/\/maps\./;
            if (googleMapLink && !googleMapRegex.test(googleMapLink)) {
                alert('Please enter a valid Google Map Link.');
                return;
            }

            try {
                //fetch() 是一個用於發送 HTTP 請求的原生 JavaScript 函數。
                const response = await fetch('http://localhost:5000/verify-recaptcha', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({token: recaptchaToken}) //body 是請求的主體（內容），即我們實際上要傳送給伺服器的數據。
                    //將一個 JavaScript 物件 { token: recaptchaToken } 轉換成 JSON 字串格式。
                });
                const data = await response.json(); //data 變數保存了從伺服器回傳的資料

                if (data.success) { //data.success 是伺服器回傳的一個布林值，表示 reCAPTCHA 驗證是否通過。
                    const templateParams = {
                        issueType,
                        googleMapLink,
                        message,
                        email,
                    };

                    emailjs.send('service_0gbg9qn', 'template_5xpq4u5', templateParams, 'IR455150GGLNvaXRn')
                    .then((response) => {
                        console.log('Email sent successfully!', response.status, response.text);
                        // 重置表單欄位
                        setIssueType('');
                        setGoogleMapLink('');
                        setMessage('');
                        setEmail('');
                        alert('Your message has been sent!');
                    }, (error) => {
                        console.error('Failed to send email. Error:', error);
                    });
                } else {
                    alert('Captcha verification failed.');
                }
            } catch (error) {
                console.error('Error verifying captcha:', error);
            }
        };


        /*
        The code you shared uses the Promise-based structure provided by EmailJS. 
        When you call emailjs.send(), it returns a promise. 
        Using .then() allows you to specify what should happen when the promise resolves 
        (successful email sending) and what should happen when it rejects (error during sending).
        */



    return (
        //onSubnit : This is a prop (property) that React recognizes as an event handler (時時觀察submit的動靜，如有動靜發生就會trigger handleSubmit function) for form submissions.
        //This part assigns the handleSubmit function to the onSubmit event. When the form is submitted, the handleSubmit function will be called.
        //The handleSubmit function uses the updated issueType (that was set by the radio button selection, 就是那個onChange event handler觀察到變更並改變的值) along with any other form data to process the submission.
        <form id='contact-form' onSubmit={handleSubmit}>
            <img
            src={contactImg}
            alt='contact'
            style={{ width: '50%', maxWidth: '180px', height: 'auto', margin: '10px' }}>
            </img>
            <div id='contact-form-q1'>
                <label>問題種類：</label>
                <div>
                    <label>
                        <input
                            type="radio" //Radio buttons allow users to select one option from a set of options.
                            value="發現新商店" //The expression issueType === '發現新商店' evaluates to true or false. 
                            checked={issueType === '發現新商店'}                 //If it is true, the radio button will be checked（selected）; if false, it will not be checked.
                            onChange={(e) => setIssueType(e.target.value)} //The target property of the event object e refers to the DOM element that triggered the event. For example, if a user clicks a button, e.target will point to that button. value : accesses the current value of that element
                            //onChange : means that when the change event occurs, it will execute the arrow function with the event object e as an argument.
                            />
                            發現新商店
                    </label>
                    <label>
                        <input 
                            type="radio"
                            value="商店勘誤"
                            checked={issueType === '商店勘誤'}
                            onChange={(e) => setIssueType(e.target.value)}
                        />
                        商店勘誤
                    </label>
                    <label>
                        <input 
                            type="radio"
                            value="其他"
                            checked={issueType === '其他'}
                            onChange={(e) => setIssueType(e.target.value)}
                        />
                        其他
                    </label>
                </div>
            </div>

            <div>
                <label>
                    商店 Google Map 連結：
                </label>
                <input 
                    type="url"
                    value={googleMapLink}
                    onChange={(e) => setGoogleMapLink(e.target.value)}
                />
            </div>

            <div>
                <label>內文:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength="200"
                    placeholder="請輸入您的訊息 (限200字)"
                />
            </div>


            <div>
                <label>您的 Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@example.com"
                />
            </div>
            
            <button type="submit">Submit</button>

        </form>
    )
}

export default ContactForm;
// make the ContactForm component available for use in other files. 
//By using export default, you specify that this is the main export for the module, which can then be imported into other modules without using curly braces.