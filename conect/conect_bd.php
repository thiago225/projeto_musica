<?php

global $conn;
include_once "conexao.php";

// Dados em formato JSON
$data = file_get_contents('../assets/musica.json');

// Converter os dados JSON para um array associativo em PHP
$dados = json_decode($data, true);

//var_dump($dados);
foreach ($dados as $item){

    // Inserir os dados no banco de dados
    $path = mysqli_real_escape_string($conn, $item['path']);
    $displayName = mysqli_real_escape_string($conn, $item['displayName']);
    $cover = mysqli_real_escape_string($conn, $item['cover']);
    $artist = mysqli_real_escape_string($conn, $item['artist']);

    $sql01 = mysqli_query($conn,"SELECT * FROM musica_img WHERE displayNamen = '$displayName'");

    if($sql01->num_rows){
        echo "já cadastrado";
    }else{
        $sql = "INSERT INTO musica_img(path, displayNamen, cover, artist) VALUES('$path', '$displayName', '$cover', '$artist')";

        if ($conn->query($sql) === TRUE) {
            echo "Dados inseridos com sucesso";
        } else {
            echo "Erro ao inserir dados: " . $conn->error;
        }
    }
}
?>
