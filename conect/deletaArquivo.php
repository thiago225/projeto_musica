<?php

include_once "funcoes.php";
include_once "configs.php";


$nomeTabela = "musica_path";

$db = getMainDB();

if(deletarArquivos($db,$nomeTabela)){
    logMsg("arquivo deletado com sucesso");
}else{
    logMsg("error ao deletar");
}


?>
