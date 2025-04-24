<?php

include_once "dropdown2.php";

$ddactivo = new dropdown2();
$inhtml = "";

$inhtml = $ddactivo->geradropdown_S_N($campo_nome, $campo_id, $classe_form, true);

echo $inhtml;