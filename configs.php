<?php

error_reporting( E_ALL & ~E_NOTICE & ~E_WARNING);

date_default_timezone_set('America/Fortaleza');

//BASE DE DADOS DO MÓDULO DE INTEGRAÇÃO
define("DB_HOST","sql10.freesqldatabase.com");
define("DB_NAME","sql10728181");
define("DB_USER","sql10728181");
define("DB_PASS","wtZqalrcrp");

//LOGS
define('DIR_LOGS', __DIR__."/logs/");
define('ARQUIVO_LOG_MSG', "logs.txt");

?>