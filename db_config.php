<?php
$host = "localhost";
$user = "root"; // of jouw gebruikersnaam
$pass = "";     // of jouw wachtwoord
$db = "esport_event";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("❌ Connectie mislukt: " . $conn->connect_error);
}
?>
