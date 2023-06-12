<?php

global $conn;
include_once "conexao.php";

// Dados em formato JSON
$data = file_get_contents('../assets/musica.json');

// Converter os dados JSON para um array associativo em PHP
$dados = json_decode($data, true);
//var_dump($dados);

//mapiando o json

//$path = $dados[0]['path'];
//var_dump($path) . PHP_EOL;
//$displayName = $dados[0]['displayName'];
//var_dump($displayName) . PHP_EOL;
//$cover = $dados[0]['cover'];
//var_dump($cover) . PHP_EOL;
//$artist = $dados[0]['artist'];
//var_dump($artist) . PHP_EOL;

foreach ($dados as $item){

    // Inserir os dados no banco de dados
    $path = mysqli_real_escape_string($conn, $item['path']);
    $displayName = mysqli_real_escape_string($conn, $item['displayName']);
    $cover = mysqli_real_escape_string($conn, $item['cover']);
    $artist = mysqli_real_escape_string($conn, $item['artist']);

    $sql01 = "SELECT * FROM musica_img WHERE displayNamen = '$displayName'";
    $sql02 = $conn->query($sql01);

    if($sql02->num_rows > 0){
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
