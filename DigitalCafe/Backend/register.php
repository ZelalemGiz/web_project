<?php
require_once 'connection.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $location = $_POST['location'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm_password'];

    try {
        // Check if email already exists
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "Email already registered.";
            exit();
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user into database
        if ($password !== $confirmPassword) {
            echo "Passwords do not match.";
            exit();
        }
        $stmt = $conn->prepare("INSERT INTO users (name, location, email, phone, password, confirm_password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $location, $email, $phone, $hashedPassword, $confirmPassword]);

        header('Location: login.html');
        exit();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}



?>