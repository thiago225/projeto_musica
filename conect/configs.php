<?php

error_reporting( E_ALL & ~E_NOTICE & ~E_WARNING);

date_default_timezone_set('America/Fortaleza');

//BASE DE DADOS DO MÓDULO DE INTEGRAÇÃO
define("DB_HOST","localhost");
define("DB_NAME","musicas");
define("DB_USER","root");
define("DB_PASS","");

//LOGS
define('DIR_LOGS', __DIR__."/logs/");
define('ARQUIVO_LOG_MSG', "logs.txt");

?>