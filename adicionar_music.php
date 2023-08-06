<?php
include_once "conect/funcoes.php";
include_once "conect/util.php";

$db = getMainDB();
$path = tratamento($db, $_POST['path']);
$displayName = tratamento($db, $_POST['displayName']);
$cover = tratamento($db, $_POST['cover']);
$artist = tratamento($db, $_POST['artist']);

$select = "select path from musica_path where path = '$path'";
$qs = $db->query($select);

if($qs->num_rows == 0){
    $insert = "insert into musica_path (path,displayNamen,cover,artist) values ('$path', '$displayName','$cover','$artist')";
    $qi = $db->query($insert);
    if($qi){
        logMsg("Inserindo música: $displayName");
    }else{
        logMsg("Error: $db->error");
    }

}else{
    logMsg("Música já inserinda!! -> $path");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>adicionar musica</title>
</head>
<body>
    <form action="" method="post">
        <div>
            <label>Path:</label>
            <input type="text" class="Path" name="Path" placeholder="ex: musica/mp3/1.mp3" >
        </div>
        <br>
        <div>
            <label>displayName:</label>
            <input type="text" class="displayName" name="displayName" placeholder="ex: The Charmer's Call">
        </div>
        <br>
        <div>
            <label>cover:</label>
            <input type="text" class="cover" name="cover" placeholder="ex: musica/img/1.jpg">
        </div>
        <br>
        <div>
            <label>artist:</label>
            <input type="text" class="artist" name="artist" placeholder="ex: Hanu Dixit">
        </div>
        <br>
        <input type="submit" class="enviar" name="botao" value="em caminhar" >

    </form>
</body>
</html>