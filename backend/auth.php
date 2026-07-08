<?php
require_once 'vendor/autoload.php';

$client = new Google\Client();
$client->setClientId('602683202013-qduslk5pa9mdrv2bitbrmqfjbnru423k.apps.googleusercontent.com');

$client->setClientSecret('');

$client->setRedirectUri('http://kairos.org/auth/google'); 

$client->addScope("email");
$client->addScope("profile");

$authUrl = $client->createAuthUrl();

header('Location: ' . filter_var($authUrl, FILTER_SANITIZE_URL));
exit;