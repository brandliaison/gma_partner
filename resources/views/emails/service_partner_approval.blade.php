<!DOCTYPE html>
<html>

<head>
    <title>Service Partner Account Status</title>
</head>

<body>
    <p>Dear {{ $data['name'] }},</p>

    <p>Your service partner account status has been updated.</p>

    <p>
        <strong>Status:</strong> {{ $data['status'] }} <br>
        @if ($data['status'] == 'Approved')
            Your account has been approved! You can now log in using your mobile number as your username and password.
            <br>
            <a href="{{ env('APP_URL') }}/login">Login Here</a>
            @elseif ($data['status'] == 'Rejected')
                Your account is Rejected. Please contact us for support.
            @else
                Your account is currently pending approval. We will notify you once it's approved.
            @endif
    </p>

    <p>Thank you!</p>
    <p>Best Regards, <br> Get My Approval</p>
</body>

</html>
