<?php
include_once __DIR__. "/../configs.php";
include_once __DIR__ ."/../DataBase/database.php";


$caminho = __DIR__ ."/../assets/musica.json";
$infos = json_decode(file_get_contents($caminho), true);

$db_conn = new DataBase();
foreach ($infos as $info) {
    $arr = array(
        "path" => $info['path'],
        "displayName" => $info['displayName'],
        "cover" => $info['cover'],
        "artist" => $info['artist'],
        "dth_inserido" => date('Y-m-d H:i:s')
    );

    $db_conn->save($arr, 'musicas');
}