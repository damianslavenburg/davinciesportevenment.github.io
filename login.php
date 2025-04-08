<?php
session_start();
require_once 'db_config.php';

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username && $password) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['username'];
            echo "✅ Inloggen geslaagd. Welkom, " . htmlspecialchars($user['username']) . "!";
            // header('Location: dashboard.php'); // Als je een pagina hebt na inloggen
        } else {
            echo "❌ Ongeldig wachtwoord.";
        }
    } else {
        echo "❌ Gebruiker niet gevonden.";
    }
} else {
    echo "❌ Vul alle velden in.";
}
?>
