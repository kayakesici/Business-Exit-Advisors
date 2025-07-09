<?php
if ($_POST) {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));

    // Check if data is valid
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill out all required fields and use a valid email address.";
        exit;
    }

    // Set email details
    $recipient = "info@businessexitadvisors.com"; // CHANGE THIS TO YOUR EMAIL
    $subject = "New Contact Form Submission from $name";
    
    // Build email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "Message:\n$message\n";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Sorry, there was an error sending your message. Please try again.";
    }
} else {
    // Not a POST request
    echo "Error: Invalid request method.";
}
?>