<?php
// Enable full error reporting (remove or disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Get and sanitize form inputs
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"] ?? ''));
    $message = strip_tags(trim($_POST["message"] ?? ''));

    // 2. Validate required fields
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: error.html");
        exit;
    }

    // 3. Email configuration
    $recipient = "hello@businessexitadvisors.co.uk";
    $from_email = "noreply@businessexitadvisors.co.uk";  // make sure you create this mailbox
    $subject = "New Business Exit Inquiry from $name";

    $email_content = "You have a new Business Exit Inquiry:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "\nMessage:\n$message\n";
    $email_content .= "\nSubmitted on: " . date('Y-m-d H:i:s') . "\n";
    $email_content .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

    // 4. Proper headers
    $headers = "From: Business Exit Advisors <$from_email>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 5. Send email
    if (mail($recipient, $subject, $email_content, $headers)) {
        header("Location: thank-you.html");
        exit;
    } else {
        // Optional: log to a file for debugging
        file_put_contents('mail_error_log.txt', date('c') . " - Mail failed\n", FILE_APPEND);
        header("Location: error.html");
        exit;
    }
} else {
    header("Location: error.html");
    exit;
}
?>
