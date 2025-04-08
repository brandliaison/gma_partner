<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 400px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        h2 {
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            background: #007bff;
            color: white;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 5px;
            margin: 10px 0;
        }
        p {
            color: #555;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email OTP Verification</h2>
        <p>Your One-Time Password (OTP) for email verification is:</p>
        <div class="otp">{{ $otp }}</div>
        <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <div class="footer">
            <p>Thank you,<br>Support Team</p>
        </div>
    </div>
</body>
</html>
