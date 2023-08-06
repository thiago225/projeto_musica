<?php

function tratamento($conn, $dados){
    $str = mysqli_real_escape_string($conn, $dados);
    return $str;
}

?>