<?php
//CORS and Preflight Handling
$allowed_origins = ["https://oteship.eu", "https://www.oteship.eu"];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

//Handle the browser preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//Restrict to POST requests only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
    exit();
}

//IP-Based Rate Limiting (1 min cooldown per IP)
$user_ip = $_SERVER['REMOTE_ADDR'];
$temp_dir = sys_get_temp_dir();
$rate_limit_file = $temp_dir . '/rate_limit_' . md5($user_ip) . '.txt';

if (file_exists($rate_limit_file)) {
    $last_request_time = file_get_contents($rate_limit_file);
    if ((time() - (int)$last_request_time) < 60) {
        http_response_code(429); // Too Many Requests
        echo json_encode(["status" => "error", "message" => "Too many requests. Please wait a minute before trying again."]);
        exit();
    }
}

//Update the last request time for this IP
file_put_contents($rate_limit_file, time());

//Api keys
$service_id = "key";
$template_id = "key";
$public_key = "key";
$private_key = "key";

//Get and decode the form data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

if ($request) {
    //Extract and Sanitize Inputs
    $user_name = isset($request['user_name']) ? strip_tags(trim($request['user_name'])) : '';
    $user_email = isset($request['user_email']) ? filter_var(trim($request['user_email']), FILTER_SANITIZE_EMAIL) : '';
    $user_phone = isset($request['user_phone']) ? strip_tags(trim($request['user_phone'])) : '';
    $message = isset($request['message']) ? htmlspecialchars(trim($request['message']), ENT_QUOTES, 'UTF-8') : '';

    //Backend validation
    if (empty($user_name) || empty($user_email) || empty($message)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit();
    }

    if (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit();
    }

    //Build array for EmailJS
    $clean_params = array(
        'user_name' => $user_name,
        'user_email' => $user_email,
        'user_phone' => $user_phone,
        'message' => $message
    );

    //Prepare payload for EmailJS API
    $data = array(
        'service_id' => $service_id,
        'template_id' => $template_id,
        'user_id' => $public_key,
        'accessToken' => $private_key,
        'template_params' => $clean_params 
    );

    //Send the request via cURL
    $ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    //Enforce SSL verification in production
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    //Handle the response and log errors securely
    if ($httpCode == 200) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Email sent!"]);
    } else {
        //Log the exact error to the server, but don't show it to the user
        error_log("EmailJS API Error - HTTP Code: $httpCode - Response: $response - cURL Error: $curlError");
        
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send email due to a server error. Please try again later."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "No data received or invalid JSON payload."]);
}
?>