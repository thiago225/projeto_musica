<?php
include_once "configs.php";

function tratamento($conn, $dados){
    $str = mysqli_real_escape_string($conn, $dados);
    return $str;
}

function logMsg($msg)
{
    if (php_sapi_name() === "cli")
        echo $msg . "\n";
    else
        echo $msg . '<br />';

    if (($log_file = fopen(DIR_LOGS . "log_" . date('Y_m_d') . '.txt', "a")) !== FALSE) {
        (fwrite($log_file, '[' . date('H:i:s') . '] ' . $msg . "\n"));
        fclose($log_file);
    }
}


function getMainDB()
{
    $mainDBConex = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mainDBConex->errno) {
        logMsg("Problemas ao conectar com a base: " . $mainDBConex->error);
        die();
    }
    return $mainDBConex;
}

function deletarArquivos($conexao, $tabela){
    $umMesAtras = date('Y-m-d H:i:s', strtotime('-1 month'));

    $query = "delete from $tabela where dataHora < '$umMesAtras'";

    if(mysqli_query($conexao, $query)){
        return true;
    }else{
        return false;
    }
}

?>