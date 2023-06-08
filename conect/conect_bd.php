<?php

// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "musicas";

// Dados em formato JSON
$data = file_get_contents('../assets/musica.json');

// Converter os dados JSON para um array associativo em PHP
$dados = json_decode($data, true);

// Criar a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar se ocorreu algum erro na conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Inserir os dados no banco de dados
foreach ($dados as $item) {
    $path = mysqli_real_escape_string($conn, $item['path']);
    $displayName = mysqli_real_escape_string($conn, $item['display_name']);
    $cover = mysqli_real_escape_string($conn, $item['cover']);
    $artist = mysqli_real_escape_string($conn, $item['artist']);

    // Comando INSERT
    $insert_query = "INSERT INTO musica_img (path, display_name, cover, artist) VALUES ('$path', '$displayName', '$cover', '$artist')";

    // Executar a consulta SQL
    $result = mysqli_query($conn, $insert_query);

    // Verificar se ocorreu algum erro na execução da consulta
    if (!$result) {
        echo "Erro na execução da consulta SQL: " . mysqli_error($conn);
    }
}

// Fechar a conexão com o banco de dados
$conn->close();
?>
