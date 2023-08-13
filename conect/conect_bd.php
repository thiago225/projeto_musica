<?php

global $conn;
include_once "util.php";
include_once "funcoes.php";

// Dados em formato JSON
$data = file_get_contents('../assets/musica.json');

// Converter os dados JSON para um array associativo em PHP
$dados = json_decode($data, true);

$db = getMainDB();

foreach ($dados as $item){

    // Inserir os dados no banco de dados
    $path = tratamento($db, $item['path']);
    $displayName = tratamento($db, $item['displayName']);
    $cover = tratamento($db, $item['cover']);
    $artist = tratamento($db, $item['artist']);+


    $sql01 = "SELECT path FROM musica_path WHERE path = '$path'";
    $sql02 = $db->query($sql01);

    if($sql02->num_rows == 0){
        $sql = "INSERT INTO musica_path(path, displayNamen, cover, artist) VALUES('$path', '$displayName', '$cover', '$artist')";
        $insert = $db->query($sql);
        logMsg ("Inserindo musica... -> $displayName");
    }else{
        logMsg ("Msuica já inserinda!! -> $displayName");
    }
}
?>
