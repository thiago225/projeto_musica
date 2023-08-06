<?php
error_reporting( E_ALL & ~E_NOTICE );

/*possibilidade de chamar o processamento, retardando a execução em alguns segundos */
// if( $argv[1]=='offset_30sec' ){
//     sleep(30); 
// }

include_once 'conect/configs.php';
include_once 'conect/util.php';
include_once 'conect/funcoes.php';

// $db1 = getMainDB();

date_default_timezone_set('America/Fortaleza');

?>