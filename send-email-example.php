<?php
// Suppress errors/warnings from output
error_reporting(0);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);

// Start output buffering to catch any accidental output
ob_start();

// Helper function for clean JSON responses
function sendJsonResponse($statusCode, $data) {
    // Clear any accidental output that might have been buffered
    ob_clean();
    
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

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
    sendJsonResponse(405, ["status" => "error", "message" => "Method not allowed."]);
}

//IP-Based Rate Limiting (1 min cooldown per IP)
$user_ip = $_SERVER['REMOTE_ADDR'];
$temp_dir = sys_get_temp_dir();
$rate_limit_file = $temp_dir . '/rate_limit_' . md5($user_ip) . '.txt';

if (file_exists($rate_limit_file)) {
    $last_request_time = @file_get_contents($rate_limit_file); // Suppress warnings with @
    if ($last_request_time && (time() - (int)$last_request_time) < 60) {
        sendJsonResponse(429, ["status" => "error", "message" => "Too many requests. Please wait a minute before trying again."]);
    }
}

//Update the last request time for this IP
@file_put_contents($rate_limit_file, time()); // Suppress warnings with @

//Api keys
$service_id = "key";
$template_id = "key";
$public_key = "key";
$private_key = "key";

//Get and decode the form data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata, true);

if (!$request) {
    sendJsonResponse(400, ["status" => "error", "message" => "No data received or invalid JSON payload."]);
}

//Extract and Sanitize Inputs
$user_name = isset($request['user_name']) ? strip_tags(trim($request['user_name'])) : '';
$user_email = isset($request['user_email']) ? filter_var(trim($request['user_email']), FILTER_SANITIZE_EMAIL) : '';
$user_phone = isset($request['user_phone']) ? strip_tags(trim($request['user_phone'])) : '';
$message = isset($request['message']) ? htmlspecialchars(trim($request['message']), ENT_QUOTES, 'UTF-8') : '';

//Backend validation
if (empty($user_name) || empty($user_email) || empty($message)) {
    sendJsonResponse(400, ["status" => "error", "message" => "Missing required fields."]);
}

if (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(400, ["status" => "error", "message" => "Invalid email format."]);
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
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_TIMEOUT, 30); // Add timeout to prevent hanging

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

//Handle the response and log errors securely
if ($httpCode == 200) {
    sendJsonResponse(200, ["status" => "success", "message" => "Email sent!"]);
} else {
    //Log the exact error to the server, but don't show it to the user
    error_log("EmailJS API Error - HTTP Code: $httpCode - Response: $response - cURL Error: $curlError");
    sendJsonResponse(500, ["status" => "error", "message" => "Failed to send email due to a server error. Please try again later."]);
}