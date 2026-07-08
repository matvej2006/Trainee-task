<?php
require_once __DIR__ . '/../vendor/autoload.php'; 

$client = new Google\Client();
$client->setClientId('602683202013-qduslk5pa9mdrv2bitbrmqfjbnru423k.apps.googleusercontent.com');
$client->setClientSecret('');
$client->setRedirectUri('http://kairos.org/auth/google');

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);

    $googleAuth = new Google\Service\Oauth2($client);
    $googleUser = $googleAuth->userinfo->get();

    $userData = [
        'id'      => $googleUser->id,
        'email'   => $googleUser->email,
        'name'    => $googleUser->name,
        'picture' => $googleUser->picture
    ];

    $jsonData = urlencode(json_encode($userData));
    
    header("Location: http://localhost:5173/index.html?user=" . $jsonData);
    exit;
} else {
    header("Location: http://localhost:5173/index.html?error=auth_failed");
    exit;
}