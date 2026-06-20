package com.jobportal.utility;

public class Data {
    public static String getMessageBody(String otp, String name) {
        return String.format("""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>OTP Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%%;
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
                .otp-box {
                    text-align: center;
                    font-size: 22px;
                    font-weight: bold;
                    color: #d32f2f;
                    background: #ffebee;
                    padding: 10px;
                    border-radius: 5px;
                    display: inline-block;
                    margin: 10px 0;
                }
                .message {
                    font-size: 16px;
                    color: #555;
                    text-align: center;
                    margin-top: 10px;
                }
                .footer {
                    text-align: center;
                    font-size: 14px;
                    color: #777;
                    margin-top: 20px;
                    padding-top: 10px;
                    border-top: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">🔐 OTP Verification</div>
                <p class="message">Hello, %s</p>
                <p class="message">Your One-Time Password (OTP) for verification is:</p>
                <div class="otp-box">%s</div>
                <p class="message">This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
                <p class="message">If you did not request this, please ignore this email.</p>
                <div class="footer">
                    <p>⚡ JobPortal Team</p>
                    <p>Need help? <a href="mailto:support@jobportal.com">Contact Us</a></p>
                </div>
            </div>
        </body>
        </html>
        """, name, otp);
    }
}
