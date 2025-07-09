<?php
if ($_POST) {
    // Get form data and sanitize
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));

    // Validate required fields
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Redirect to error page for validation failures
        header("Location: error.html");
        exit;
    }

    // Email configuration
    $recipient = "kayakesici@icloud.com"; // Your email address
    $subject = "New Business Exit Inquiry from $name";
    
    // Build professional email content
    $email_content = "BUSINESS EXIT INQUIRY\n";
    $email_content .= "======================\n\n";
    $email_content .= "Contact Details:\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "\nMessage:\n";
    $email_content .= "--------\n";
    $email_content .= "$message\n\n";
    $email_content .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $email_content .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

    // Email headers for better delivery
    $email_headers = "From: Business Exit Advisors <$recipient>\r\n";
    $email_headers .= "Reply-To: $name <$email>\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // Attempt to send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Success - redirect to thank you page
        header("Location: thank-you.html");
        exit;
    } else {
        // Failed - redirect to error page
        header("Location: error.html");
        exit;
    }
} else {
    // Not a POST request - redirect to error page
    header("Location: error.html");
    exit;
}
?>