<?php

$host = "localhost";
$user = "root";
$senha = "";
$database = "musicas";

$conn = new mysqli($host, $user, $senha, $database);

if ($conn->connect_error) {
    die("Falha ao conectar: " . $conn->connect_error);
}